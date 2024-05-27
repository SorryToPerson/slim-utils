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
var isEmpty = function (value) {
    return value == null || value === undefined || value === '';
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
    SlimConsole.prototype._log = function (type, textOrTitle, content) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var title = isEmpty(content) ? type : textOrTitle;
        var text = isEmpty(content) ? textOrTitle : content;
        if (typeof window !== 'undefined') {
            // 在浏览器环境中
            var color = this.config[type];
            console.log.apply(console, __spreadArray(["%c ".concat(title, " %c ").concat(text, " %c"), "background:".concat(color, ";border:1px solid ").concat(color, "; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;"), "border:1px solid ".concat(color, "; padding: 1px; border-radius: 0 2px 2px 0; color: ").concat(color, ";"), 'background:transparent'], args, false));
        }
        else if (typeof global !== 'undefined') {
            // 在node环境中
            console.log("".concat(console_1.backColorEnum.red + console_1.fontColorEnum.gray, " ").concat(title), console_1.sysStyleEnum.reset + "".concat(console_1.fontColorEnum.gray + text), console_1.sysStyleEnum.reset);
            // console.log('\033[41;37m CLEAN \033[40;31m 完成清除\033[0m')
        }
    };
    SlimConsole.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, args);
    };
    SlimConsole.prototype.info = function (t, c) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this._log.apply(this, __spreadArray(['Info', t, c], args, false));
    };
    SlimConsole.prototype.warn = function (t, c) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this._log.apply(this, __spreadArray(['Warn', t, c], args, false));
    };
    SlimConsole.prototype.error = function (t, c) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this._log.apply(this, __spreadArray(['Error', t, c], args, false));
    };
    SlimConsole.prototype.success = function (t, c) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this._log.apply(this, __spreadArray(['Success', t, c], args, false));
    };
    return SlimConsole;
}());
exports.SlimConsole = SlimConsole;
