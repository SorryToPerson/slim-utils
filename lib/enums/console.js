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
        Info: '#909090',
        Primary: '#3e83f9',
        Warn: '#eca72e',
        Error: '#e95449',
        Success: '#64b82f',
    },
    light: {
        Info: '#b3b3b3',
        Primary: '#599aff',
        Warn: '#ffce54',
        Error: '#ff7b68',
        Success: '#7ad849',
    },
    dark: {
        Info: '#303030',
        Primary: '#2a7def',
        Warn: '#d99a00',
        Error: '#c44237',
        Success: '#4cb427',
    },
    pastel: {
        Info: '#e0e0e0',
        Primary: '#b3d4fc',
        Warn: '#ffd8aa',
        Error: '#ffbaba',
        Success: '#c0e8c0',
    },
    vibrant: {
        Info: '#77b3ff',
        Primary: '#448aff',
        Warn: '#ff9100',
        Error: '#ff5252',
        Success: '#69f0ae',
    },
    neutral: {
        Info: '#9e9e9e',
        Primary: '#90caf9',
        Warn: '#ffa07a',
        Error: '#b04040',
        Success: '#98fb98',
    },
};
