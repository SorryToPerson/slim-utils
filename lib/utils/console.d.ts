import type { Config, ConfigType } from '../typings/console';
export declare class SlimConsole {
    config: Config;
    constructor(config?: Config | ConfigType);
    private _log;
    log(...args: any[]): void;
    info(t: any, c: any, ...args: any[]): void;
    warn(t: any, c: any, ...args: any[]): void;
    error(t: any, c: any, ...args: any[]): void;
    success(t: any, c: any, ...args: any[]): void;
}
