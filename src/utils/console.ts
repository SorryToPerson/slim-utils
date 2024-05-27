import {
  sysStyleEnum,
  backColorEnum,
  fontColorEnum,
  configEnum,
} from '../enums/console';
import type { LogType, Config, ConfigType } from '../typings/console';

const isEmpty = (value: any) => {
  return value == null || value === undefined || value === '';
};

export class SlimConsole {
  config: Config = configEnum.default;
  constructor(config: Config | ConfigType = 'default') {
    if (typeof config === 'string') {
      this.config = configEnum[config];
    } else {
      this.config = config;
    }
  }
  private _log(type: LogType, textOrTitle, content, ...args) {
    const title = isEmpty(content) ? type : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    if (typeof window !== 'undefined') {
      // 在浏览器环境中
      const color = this.config[type];
      console.log(
        `%c ${title} %c ${text} %c`,
        `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
        `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
        'background:transparent',
        ...args,
      );
    } else if (typeof global !== 'undefined') {
      // 在node环境中
      console.log(
        `${backColorEnum.red + fontColorEnum.gray} ${title}`,
        sysStyleEnum.reset + `${fontColorEnum.gray + text}`,
        sysStyleEnum.reset,
      );
      // console.log('\033[41;37m CLEAN \033[40;31m 完成清除\033[0m')
    }
  }

  log(...args) {
    console.log(...args);
  }

  info(t, c, ...args) {
    this._log('Info', t, c, ...args);
  }

  warn(t, c, ...args) {
    this._log('Warn', t, c, ...args);
  }

  error(t, c, ...args) {
    this._log('Error', t, c, ...args);
  }

  success(t, c, ...args) {
    this._log('Success', t, c, ...args);
  }
}
