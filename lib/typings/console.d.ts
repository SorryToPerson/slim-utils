export type LogType = 'Info' | 'Primary' | 'Warn' | 'Error' | 'Success';
export type Config = {
    [key in LogType]: string;
};
export type ConfigType = 'default' | 'light' | 'dark' | 'pastel' | 'vibrant' | 'neutral';
export type ConfigEnumType = {
    [key in ConfigType]: Config;
};
