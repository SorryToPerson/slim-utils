import {
  sysStyleEnum,
  backColorEnum,
  fontColorEnum,
  configEnum,
} from '../enums/console';
import type { LogType, Config, ConfigType, Options } from '../typings/console';

const check = (type: LogType, args: any[], options: Options) => {
  let title: LogType | string = type;
  let text = '';
  let arr = args;
  if (args.length === 0) {
    title = type;
  } else if (args.length >= 1) {
    if (typeof args[0] === 'string') {
      title = args[0];
      arr = args.slice(1);
      if (args[1] && typeof args[1] === 'string' && !options.timestamp) {
        text = args[1];
        arr = args.slice(2);
      }
    }
  }

  if (options.timestamp) {
    text = new Date().getTime().toString();
  }

  return {
    title,
    text,
    arr,
  };
};

export class SlimConsole {
  config: Config = configEnum.default;
  options: Options = {
    timestamp: false,
    fontSize: 14,
  };
  constructor(config: Config | ConfigType = 'default', options?: Options) {
    if (typeof config === 'string') {
      this.config = configEnum[config];
    } else {
      this.config = config;
    }

    if (options) {
      this.options = {
        ...this.options,
        ...options,
      };
    }
  }
  private _log(type: LogType, ...args) {
    const { title, text, arr } = check(type, args, this.options);

    if (typeof window !== 'undefined') {
      // 在浏览器环境中
      const color = this.config[type];
      if (text) {
        console.log(
          `%c ${title} %c ${text} %c`,
          `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff; font-size: ${this.options.fontSize};`,
          `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color}; font-size: ${this.options.fontSize};`,
          'background:transparent',
          ...arr,
        );
      } else {
        console.log(
          `%c ${title} `,
          `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff; font-size: ${this.options.fontSize};`,
          ...arr,
        );
      }
    } else if (typeof global !== 'undefined') {
      const renderArr = arr;
      // 在node环境中
      switch (type) {
        case 'Info':
          text &&
            renderArr.unshift(
              ` ${fontColorEnum.white} ${text} ${sysStyleEnum.reset}`,
            );
          renderArr.unshift(
            `${backColorEnum.white + fontColorEnum.black} ${title} ${
              sysStyleEnum.reset
            }`,
          );
          console.log(...renderArr);
          break;
        case 'Primary':
          text &&
            renderArr.unshift(
              ` ${fontColorEnum.blue} ${text} ${sysStyleEnum.reset}`,
            );
          renderArr.unshift(
            `${backColorEnum.blue + fontColorEnum.white} ${title} ${
              sysStyleEnum.reset
            }`,
          );
          console.log(...renderArr);
          break;
        case 'Warn':
          text &&
            renderArr.unshift(
              ` ${fontColorEnum.yellow} ${text} ${sysStyleEnum.reset}`,
            );
          renderArr.unshift(
            `${backColorEnum.yellow + fontColorEnum.white} ${title} ${
              sysStyleEnum.reset
            }`,
          );
          console.log(...renderArr);
          break;
        case 'Error':
          text &&
            renderArr.unshift(
              ` ${fontColorEnum.red} ${text} ${sysStyleEnum.reset}`,
            );
          renderArr.unshift(
            `${backColorEnum.red + fontColorEnum.white} ${title} ${
              sysStyleEnum.reset
            }`,
          );
          console.log(...renderArr);
          break;
        case 'Success':
          text &&
            renderArr.unshift(
              ` ${fontColorEnum.green} ${text} ${sysStyleEnum.reset}`,
            );
          renderArr.unshift(
            `${backColorEnum.green + fontColorEnum.white} ${title} ${
              sysStyleEnum.reset
            }`,
          );
          console.log(...renderArr);
          break;
        default:
          break;
      }
    }
  }

  log(...args) {
    this._log('Primary', ...args);
  }

  info(...args) {
    this._log('Info', ...args);
  }

  warn(...args) {
    this._log('Warn', ...args);
  }

  error(...args) {
    this._log('Error', ...args);
  }

  success(...args) {
    this._log('Success', ...args);
  }
}
