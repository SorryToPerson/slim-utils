"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSE = void 0;
var SSE = exports.SSE = /** @class */ (function () {
    function SSE(url, options) {
        this.xhr = null;
        this.readyState = SSE.INITIALIZING;
        this.progress = 0;
        this.chunk = '';
        this.listeners = {};
        this.FIELD_SEPARATOR = ':';
        this.url = url;
        this.options = options;
    }
    SSE.prototype.addEventListener = function (type, listener) {
        if (this.listeners[type] === undefined) {
            this.listeners[type] = [];
        }
        if (this.listeners[type].indexOf(listener) === -1) {
            this.listeners[type].push(listener);
        }
    };
    SSE.prototype.removeEventListener = function (type, listener) {
        if (this.listeners[type] === undefined) {
            return;
        }
        this.listeners[type] = this.listeners[type].filter(function (el) { return el !== listener; });
        if (this.listeners[type].length === 0) {
            delete this.listeners[type];
        }
    };
    SSE.prototype.dispatchEvent = function (e) {
        if (!e) {
            return true;
        }
        // @ts-ignore
        e.source = this;
        var onHandler = 'on' + e.type;
        if (typeof this[onHandler] === 'function') {
            this[onHandler](e);
            if (e.defaultPrevented) {
                return false;
            }
        }
        if (this.listeners[e.type]) {
            return this.listeners[e.type].every(function (callback) {
                callback(e);
                return !e.defaultPrevented;
            });
        }
        return true;
    };
    SSE.prototype._setReadyState = function (state) {
        var event = new CustomEvent('readystatechange');
        //@ts-ignore
        event.readyState = state;
        this.readyState = state;
        this.dispatchEvent(event);
    };
    SSE.prototype._onStreamFailure = function (e) {
        var event = new CustomEvent('error');
        //@ts-ignore
        event.data = e.currentTarget.response;
        this.dispatchEvent(event);
        this.close();
    };
    SSE.prototype._onStreamAbort = function (e) {
        this.dispatchEvent(new CustomEvent('abort'));
        this.close();
    };
    SSE.prototype._onTimeout = function (e) {
        this.dispatchEvent(e);
        this.close();
    };
    SSE.prototype._onStreamProgress = function (e) {
        var _this = this;
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
        var data = this.xhr.responseText.substring(this.progress);
        this.progress += data.length;
        data.split(/(\r\n|\r|\n){2}/g).forEach(function (part) {
            if (part.trim().length === 0) {
                _this.dispatchEvent(_this._parseEventChunk(_this.chunk.trim()));
                _this.chunk = '';
            }
            else {
                _this.chunk += part;
            }
        });
    };
    SSE.prototype._onStreamLoaded = function (e) {
        this._onStreamProgress(e);
        // Parse the last chunk.
        this.dispatchEvent(this._parseEventChunk(this.chunk));
        this.chunk = '';
    };
    SSE.prototype._parseEventChunk = function (chunk) {
        var _this = this;
        if (!chunk || chunk.length === 0) {
            return null;
        }
        var e = { id: null, retry: null, data: '', event: 'message' };
        chunk.split(/\n|\r\n|\r/).forEach(function (line) {
            line = line.trimRight();
            var index = line.indexOf(_this.FIELD_SEPARATOR);
            if (index <= 0) {
                // Line was either empty, or started with a separator and is a comment.
                // Either way, ignore.
                return;
            }
            var field = line.substring(0, index);
            if (!(field in e)) {
                return;
            }
            var value = line.substring(index + 1).trimLeft();
            if (field === 'data') {
                e[field] += value;
            }
            else {
                e[field] = value;
            }
        });
        var event = new CustomEvent(e.event);
        //@ts-ignore
        event.data = e.data;
        //@ts-ignore
        event.id = e.id;
        return event;
    };
    SSE.prototype._checkStreamClosed = function () {
        if (!this.xhr) {
            return;
        }
        if (this.xhr.readyState === XMLHttpRequest.DONE) {
            this._setReadyState(SSE.CLOSED);
        }
    };
    SSE.prototype.stream = function () {
        var _a;
        this._setReadyState(SSE.CONNECTING);
        this.xhr = new XMLHttpRequest();
        this.xhr.addEventListener('progress', this._onStreamProgress.bind(this));
        this.xhr.addEventListener('load', this._onStreamLoaded.bind(this));
        this.xhr.addEventListener('readystatechange', this._checkStreamClosed.bind(this));
        this.xhr.addEventListener('error', this._onStreamFailure.bind(this));
        this.xhr.addEventListener('abort', this._onStreamAbort.bind(this));
        this.xhr.addEventListener('timeout', this._onTimeout.bind(this));
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.timeout) {
            this.xhr.timeout = this.options.timeout;
        }
        this.xhr.open(this.options.method || (this.options.payload && 'POST') || 'GET', this.url);
        for (var header in this.options.headers) {
            this.xhr.setRequestHeader(header, this.options.headers[header]);
        }
        this.xhr.withCredentials = !!this.options.withCredentials;
        this.xhr.send(this.options.payload);
    };
    SSE.prototype.close = function () {
        var _a;
        if (this.readyState === SSE.CLOSED) {
            return;
        }
        (_a = this.xhr) === null || _a === void 0 ? void 0 : _a.abort();
        this.xhr = null;
        this._setReadyState(SSE.CLOSED);
    };
    SSE.INITIALIZING = -1;
    SSE.CONNECTING = 0;
    SSE.OPEN = 1;
    SSE.CLOSED = 2;
    return SSE;
}());
