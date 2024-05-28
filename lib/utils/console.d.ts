import type { Config, ConfigType, Options } from '../typings/console';
export declare class SlimConsole {
    config: Config;
    options: Options;
    constructor(config?: Config | ConfigType, options?: Options);
    private _log;
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    success(...args: any[]): void;
}
