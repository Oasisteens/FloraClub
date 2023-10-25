export interface TableFormatter {
    formatName(name: string): string;
    formatValue(value: string | number, LEVEL?: FORMAT_LEVEL): string;
    formatAverage(number: number | string, LEVEL?: FORMAT_LEVEL): string;
    formatMax(number: number | string, LEVEl?: FORMAT_LEVEL): string;
    formatClassName(className: string): string;
    formatHeaderValue(value: string): string;
}

export enum FORMAT_LEVEL {OK = 0, WARNING = 1, STRICT = 2}