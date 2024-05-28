import type { Config, ConfigType } from '../typings/console';
export declare class SlimConsole {
    config: Config;
    constructor(config?: Config | ConfigType);
    private _log;
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    success(...args: any[]): void;
}
