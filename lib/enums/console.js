"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configEnum = exports.fontColorEnum = exports.backColorEnum = exports.sysStyleEnum = void 0;
exports.sysStyleEnum = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m', // 消隐
};
exports.backColorEnum = {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    gray: '\x1b[2m\x1b[40m', // 背景灰色
};
exports.fontColorEnum = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[2m\x1b[30m', // 字体灰色
};
exports.configEnum = {
    default: {
        Info: '#3e83f9',
        Primary: '#3e83f9',
        Warn: '#eca72e',
        Error: '#e95449',
        Success: '#64b82f',
    },
    light: {
        Info: '#599aff',
        Primary: '#599aff',
        Warn: '#ffce54',
        Error: '#ff7b68',
        Success: '#7ad849', // 更亮的绿色，增加对比度
    },
    dark: {
        Info: '#2a7def',
        Primary: '#2a7def',
        Warn: '#d99a00',
        Error: '#c44237',
        Success: '#4cb427', // 更深的绿色，增加对比度
    },
};
