import {FORMAT_LEVEL, TableFormatter} from "./table-formatter";
import {Color} from "colors";

export class BasicTableFormatter implements TableFormatter{
    constructor(private colors: Color) {

    }

    public formatClassName(className: string): string {
        return this.colors.cyan(this.colors.bold.underline(className));
    }

    public formatMax(number: number, FORMAT_LEVEL: FORMAT_LEVEL): string {
        const result = number || '';
        return this.colorize(FORMAT_LEVEL, result);
    }

    public formatAverage(number: number, FORMAT_LEVEL: FORMAT_LEVEL): string {
        const result = number || '';
        return this.colorize(FORMAT_LEVEL, result);
    }

    public formatValue(value: string, FORMAT_LEVEL?: FORMAT_LEVEL): string {
        return this.colorize(FORMAT_LEVEL, value);
    }

    public formatName(name: string): string {
        return this.colors.bold(name.toString());
    }

    public formatHeaderValue(value: string): string {
        return this.colors.underline(this.colors.white(this.colors.bold(value.toString())));
    }

    private colorize(FORMAT_LEVEL: FORMAT_LEVEL, result: number | string) {
        const value = result !== null ? result : '';
        const colorFunction = this.getColorFunctionForFormatLevel(FORMAT_LEVEL);
        return colorFunction(this.colors.bold(value.toString()));
    }

    private getColorFunctionForFormatLevel(LEVEL: FORMAT_LEVEL): (string: string) => string {
        switch (LEVEL) {
            case FORMAT_LEVEL.OK:
                return this.colors.white;
            case FORMAT_LEVEL.WARNING:
                return this.colors.yellow;
            case FORMAT_LEVEL.STRICT:
                return this.colors.red;
            default:
                return this.colors.bold;
        }
    }

}