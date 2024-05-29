import { IOption } from '../typings/sse';

export class SSE {
  private static readonly INITIALIZING = -1;
  private static readonly CONNECTING = 0;
  private static readonly OPEN = 1;
  private static readonly CLOSED = 2;

  private url: string;
  private options: IOption;
  private xhr: XMLHttpRequest | null = null;
  private readyState: number = SSE.INITIALIZING;
  private progress: number = 0;
  private chunk: string = '';
  private listeners: { [eventType: string]: Array<Function> } = {};
  private FIELD_SEPARATOR: string = ':';

  constructor(url: string, options: IOption) {
    this.url = url;
    this.options = options;
  }

  addEventListener(type: string, listener: Function) {
    if (this.listeners[type] === undefined) {
      this.listeners[type] = [];
    }

    if (this.listeners[type].indexOf(listener) === -1) {
      this.listeners[type].push(listener);
    }
  }

  removeEventListener(type: string, listener: Function) {
    if (this.listeners[type] === undefined) {
      return;
    }

    this.listeners[type] = this.listeners[type].filter((el) => el !== listener);

    if (this.listeners[type].length === 0) {
      delete this.listeners[type];
    }
  }

  dispatchEvent(e: Event) {
    if (!e) {
      return true;
    }
    // @ts-ignore
    e.source = this;

    const onHandler = 'on' + e.type;
    if (typeof this[onHandler] === 'function') {
      this[onHandler](e);
      if (e.defaultPrevented) {
        return false;
      }
    }

    if (this.listeners[e.type]) {
      return this.listeners[e.type].every((callback) => {
        callback(e);
        return !e.defaultPrevented;
      });
    }

    return true;
  }

  _setReadyState(state: number) {
    const event = new CustomEvent('readystatechange');
    //@ts-ignore
    event.readyState = state;
    this.readyState = state;
    this.dispatchEvent(event);
  }

  _onStreamFailure(e: ProgressEvent) {
    const event = new CustomEvent('error');
    //@ts-ignore
    event.data = e.currentTarget.response;
    this.dispatchEvent(event);
    this.close();
  }

  _onStreamAbort(e: Event) {
    this.dispatchEvent(new CustomEvent('abort'));
    this.close();
  }

  _onTimeout(e: Event) {
    this.dispatchEvent(e);
    this.close();
  }

  _onStreamProgress(e: ProgressEvent) {
    if (!this.xhr) {
      return;
    }

    if (this.xhr.status !== 200) {
      this._onStreamFailure(e);
      return;
    }

    if (this.readyState === SSE.CONNECTING) {
      this.dispatchEvent(new CustomEvent('open'));
      this._setReadyState(SSE.OPEN);
    }

    const data = this.xhr.responseText.substring(this.progress);
    this.progress += data.length;
    data.split(/(\r\n|\r|\n){2}/g).forEach((part) => {
      if (part.trim().length === 0) {
        this.dispatchEvent(this._parseEventChunk(this.chunk.trim()));
        this.chunk = '';
      } else {
        this.chunk += part;
      }
    });
  }

  _onStreamLoaded(e: ProgressEvent) {
    this._onStreamProgress(e);

    // Parse the last chunk.
    this.dispatchEvent(this._parseEventChunk(this.chunk));
    this.chunk = '';
  }

  _parseEventChunk(chunk: string) {
    if (!chunk || chunk.length === 0) {
      return null;
    }

    const e: any = { id: null, retry: null, data: '', event: 'message' };
    chunk.split(/\n|\r\n|\r/).forEach((line) => {
      line = line.trimRight();
      const index = line.indexOf(this.FIELD_SEPARATOR);
      if (index <= 0) {
        // Line was either empty, or started with a separator and is a comment.
        // Either way, ignore.
        return;
      }

      const field = line.substring(0, index);
      if (!(field in e)) {
        return;
      }

      const value = line.substring(index + 1).trimLeft();
      if (field === 'data') {
        e[field] += value;
      } else {
        e[field] = value;
      }
    });

    const event = new CustomEvent(e.event);
    //@ts-ignore
    event.data = e.data;
    //@ts-ignore
    event.id = e.id;
    return event;
  }

  _checkStreamClosed() {
    if (!this.xhr) {
      return;
    }

    if (this.xhr.readyState === XMLHttpRequest.DONE) {
      this._setReadyState(SSE.CLOSED);
    }
  }

  stream() {
    this._setReadyState(SSE.CONNECTING);

    this.xhr = new XMLHttpRequest();
    this.xhr.addEventListener('progress', this._onStreamProgress.bind(this));
    this.xhr.addEventListener('load', this._onStreamLoaded.bind(this));
    this.xhr.addEventListener(
      'readystatechange',
      this._checkStreamClosed.bind(this),
    );
    this.xhr.addEventListener('error', this._onStreamFailure.bind(this));
    this.xhr.addEventListener('abort', this._onStreamAbort.bind(this));
    this.xhr.addEventListener('timeout', this._onTimeout.bind(this));
    if (this.options?.timeout) {
      this.xhr.timeout = this.options.timeout;
    }
    this.xhr.open(
      this.options.method || (this.options.payload && 'POST') || 'GET',
      this.url,
    );
    for (const header in this.options.headers) {
      this.xhr.setRequestHeader(header, this.options.headers[header]);
    }
    this.xhr.withCredentials = !!this.options.withCredentials;
    this.xhr.send(this.options.payload);
  }

  close() {
    if (this.readyState === SSE.CLOSED) {
      return;
    }

    this.xhr?.abort();
    this.xhr = null;
    this._setReadyState(SSE.CLOSED);
  }
}
