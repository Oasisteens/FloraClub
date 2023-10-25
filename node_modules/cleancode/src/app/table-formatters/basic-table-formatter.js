"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_formatter_1 = require("./table-formatter");
class BasicTableFormatter {
    constructor(colors) {
        this.colors = colors;
    }
    formatClassName(className) {
        return this.colors.cyan(this.colors.bold.underline(className));
    }
    formatMax(number, FORMAT_LEVEL) {
        const result = number || '';
        return this.colorize(FORMAT_LEVEL, result);
    }
    formatAverage(number, FORMAT_LEVEL) {
        const result = number || '';
        return this.colorize(FORMAT_LEVEL, result);
    }
    formatValue(value, FORMAT_LEVEL) {
        return this.colorize(FORMAT_LEVEL, value);
    }
    formatName(name) {
        return this.colors.bold(name.toString());
    }
    formatHeaderValue(value) {
        return this.colors.underline(this.colors.white(this.colors.bold(value.toString())));
    }
    colorize(FORMAT_LEVEL, result) {
        const value = result !== null ? result : '';
        const colorFunction = this.getColorFunctionForFormatLevel(FORMAT_LEVEL);
        return colorFunction(this.colors.bold(value.toString()));
    }
    getColorFunctionForFormatLevel(LEVEL) {
        switch (LEVEL) {
            case table_formatter_1.FORMAT_LEVEL.OK:
                return this.colors.white;
            case table_formatter_1.FORMAT_LEVEL.WARNING:
                return this.colors.yellow;
            case table_formatter_1.FORMAT_LEVEL.STRICT:
                return this.colors.red;
            default:
                return this.colors.bold;
        }
    }
}
exports.BasicTableFormatter = BasicTableFormatter;
//# sourceMappingURL=basic-table-formatter.js.map