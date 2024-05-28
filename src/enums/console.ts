import { ConfigEnumType } from '../typings/console';

export const sysStyleEnum = {
  reset: '\x1b[0m', // 关闭所有属性
  bright: '\x1b[1m', // 设置颜色明亮
  dim: '\x1b[2m', // 设置颜色暗淡
  underscore: '\x1b[4m', // 下划线
  blink: '\x1b[5m', // 闪烁
  reverse: '\x1b[7m', // 反显
  hidden: '\x1b[8m', // 消隐
};

export const backColorEnum = {
  black: '\x1b[40m', // 背景黑色
  red: '\x1b[41m', //背景红色
  green: '\x1b[42m', // 背景绿色
  yellow: '\x1b[43m', // 背景黄色
  blue: '\x1b[44m', // 背景蓝色
  magenta: '\x1b[45m', // 背景紫色
  cyan: '\x1b[46m', // 背景深绿
  white: '\x1b[47m', // 背景白色
  gray: '\x1b[2m\x1b[40m', // 背景灰色
};

export const fontColorEnum = {
  black: '\x1b[30m', // 字体黑色
  red: '\x1b[31m', //字体红色
  green: '\x1b[32m', // 字体绿色
  yellow: '\x1b[33m', // 字体黄色
  blue: '\x1b[34m', // 字体蓝色
  magenta: '\x1b[35m', // 字体紫色
  cyan: '\x1b[36m', // 字体深绿
  white: '\x1b[37m', // 字体白色
  gray: '\x1b[2m\x1b[30m', // 字体灰色
};

export const configEnum: ConfigEnumType = {
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
