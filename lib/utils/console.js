"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlimConsole = void 0;
var console_1 = require("../enums/console");
var check = function (type, args) {
    var title = type;
    var text = '';
    var arr = args;
    if (args.length === 0) {
        title = type;
    }
    else if (args.length >= 1) {
        if (typeof args[0] === 'string') {
            title = args[0];
            arr = args.slice(1);
            if (args[1] && typeof args[1] === 'string') {
                text = args[1];
                arr = args.slice(2);
            }
        }
    }
    return {
        title: title,
        text: text,
        arr: arr,
    };
};
var SlimConsole = /** @class */ (function () {
    function SlimConsole(config) {
        if (config === void 0) { config = 'default'; }
        this.config = console_1.configEnum.default;
        if (typeof config === 'string') {
            this.config = console_1.configEnum[config];
        }
        else {
            this.config = config;
        }
    }
    SlimConsole.prototype._log = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = check(type, args), title = _a.title, text = _a.text, arr = _a.arr;
        if (typeof window !== 'undefined') {
            // 在浏览器环境中
            var color = this.config[type];
            if (text) {
                console.log.apply(console, __spreadArray(["%c ".concat(title, " %c ").concat(text, " %c"), "background:".concat(color, ";border:1px solid ").concat(color, "; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;"), "border:1px solid ".concat(color, "; padding: 1px; border-radius: 0 2px 2px 0; color: ").concat(color, ";"), 'background:transparent'], arr, false));
            }
            else {
                console.log.apply(console, __spreadArray(["%c ".concat(title, " "), "background:".concat(color, ";border:1px solid ").concat(color, "; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;")], arr, false));
            }
        }
        else if (typeof global !== 'undefined') {
            var renderArr = arr;
            // 在node环境中
            switch (type) {
                case 'Info':
                    text &&
                        renderArr.unshift(" ".concat(console_1.fontColorEnum.white, " ").concat(text, " ").concat(console_1.sysStyleEnum.reset));
                    renderArr.unshift("".concat(console_1.backColorEnum.white + console_1.fontColorEnum.black, " ").concat(title, " ").concat(console_1.sysStyleEnum.reset));
                    console.log.apply(console, renderArr);
                    break;
                case 'Primary':
                    text &&
                        renderArr.unshift(" ".concat(console_1.fontColorEnum.blue, " ").concat(text, " ").concat(console_1.sysStyleEnum.reset));
                    renderArr.unshift("".concat(console_1.backColorEnum.blue + console_1.fontColorEnum.white, " ").concat(title, " ").concat(console_1.sysStyleEnum.reset));
                    console.log.apply(console, renderArr);
                    break;
                case 'Warn':
                    text &&
                        renderArr.unshift(" ".concat(console_1.fontColorEnum.yellow, " ").concat(text, " ").concat(console_1.sysStyleEnum.reset));
                    renderArr.unshift("".concat(console_1.backColorEnum.yellow + console_1.fontColorEnum.white, " ").concat(title, " ").concat(console_1.sysStyleEnum.reset));
                    console.log.apply(console, renderArr);
                    break;
                case 'Error':
                    text &&
                        renderArr.unshift(" ".concat(console_1.fontColorEnum.red, " ").concat(text, " ").concat(console_1.sysStyleEnum.reset));
                    renderArr.unshift("".concat(console_1.backColorEnum.red + console_1.fontColorEnum.white, " ").concat(title, " ").concat(console_1.sysStyleEnum.reset));
                    console.log.apply(console, renderArr);
                    break;
                case 'Success':
                    text &&
                        renderArr.unshift(" ".concat(console_1.fontColorEnum.green, " ").concat(text, " ").concat(console_1.sysStyleEnum.reset));
                    renderArr.unshift("".concat(console_1.backColorEnum.green + console_1.fontColorEnum.white, " ").concat(title, " ").concat(console_1.sysStyleEnum.reset));
                    console.log.apply(console, renderArr);
                    break;
                default:
                    break;
            }
        }
    };
    SlimConsole.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray(['Primary'], args, false));
    };
    SlimConsole.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray(['Info'], args, false));
    };
    SlimConsole.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray(['Warn'], args, false));
    };
    SlimConsole.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray(['Error'], args, false));
    };
    SlimConsole.prototype.success = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray(['Success'], args, false));
    };
    return SlimConsole;
}());
exports.SlimConsole = SlimConsole;
