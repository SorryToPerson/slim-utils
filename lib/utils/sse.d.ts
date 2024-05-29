import { IOption } from '../typings/sse';
export declare class SSE {
    private static readonly INITIALIZING;
    private static readonly CONNECTING;
    private static readonly OPEN;
    private static readonly CLOSED;
    private url;
    private options;
    private xhr;
    private readyState;
    private progress;
    private chunk;
    private listeners;
    private FIELD_SEPARATOR;
    constructor(url: string, options: IOption);
    addEventListener(type: string, listener: Function): void;
    removeEventListener(type: string, listener: Function): void;
    dispatchEvent(e: Event): boolean;
    _setReadyState(state: number): void;
    _onStreamFailure(e: ProgressEvent): void;
    _onStreamAbort(e: Event): void;
    _onTimeout(e: Event): void;
    _onStreamProgress(e: ProgressEvent): void;
    _onStreamLoaded(e: ProgressEvent): void;
    _parseEventChunk(chunk: string): CustomEvent<unknown>;
    _checkStreamClosed(): void;
    stream(): void;
    close(): void;
}
