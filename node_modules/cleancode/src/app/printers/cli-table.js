"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_formatter_1 = require("../table-formatters/table-formatter");
class CliTable {
    constructor(Table, reporter, formatter) {
        this.Table = Table;
        this.reporter = reporter;
        this.formatter = formatter;
    }
    print() {
        const report = this.reporter.getReport();
        if (!report.CLASS_NAME) {
            return;
        }
        const table = this.instantiate(report.CLASS_NAME);
        this.fillTable(table, report);
        console.log(table.toString());
    }
    instantiate(className) {
        return new this.Table({
            head: [
                this.formatter.formatClassName(className),
                this.formatter.formatHeaderValue('Value'),
                this.formatter.formatHeaderValue('Average'),
                this.formatter.formatHeaderValue('Max')
            ]
        });
    }
    fillTable(table, report) {
        table.push([this.formatter.formatName('Class lines count'), this.formatter.formatValue(report.CLASS_LINES, this.getFormatLevelForClassLines(report.CLASS_LINES))], [this.formatter.formatName('Public methods'), this.formatter.formatValue(report.PUBLIC_METHODS, this.getFormatLevelForPublicMethods(report.PUBLIC_METHODS))], [this.formatter.formatName('Private methods'), this.formatter.formatValue(report.PRIVATE_METHODS, this.getFormatLevelForPrivateMethods(report.PRIVATE_METHODS))], [this.formatter.formatName('Dependency count'), this.formatter.formatValue(report.DEPENDENCIES, this.getFormatLevelForDependencies(report.DEPENDENCIES))], [this.formatter.formatName('Method lines count'), '',
            this.formatter.formatValue(report.AVERAGE_METHOD_LINES, this.getFormatLevelForAverageMethodLinesCount(report.AVERAGE_METHOD_LINES)),
            this.formatter.formatValue(report.MAX_METHOD_LINES, this.getFormatLevelForMaxMethodLinesCount(report.MAX_METHOD_LINES))
        ]);
    }
    getFormatLevelForMaxMethodLinesCount(lines) {
        if (lines >= 8) {
            return table_formatter_1.FORMAT_LEVEL.STRICT;
        }
        else if (lines >= 6) {
            return table_formatter_1.FORMAT_LEVEL.WARNING;
        }
        else {
            return table_formatter_1.FORMAT_LEVEL.OK;
        }
    }
    getFormatLevelForAverageMethodLinesCount(lines) {
        if (lines >= 7) {
            return table_formatter_1.FORMAT_LEVEL.STRICT;
        }
        else if (lines >= 5) {
            return table_formatter_1.FORMAT_LEVEL.WARNING;
        }
        else {
            return table_formatter_1.FORMAT_LEVEL.OK;
        }
    }
    getFormatLevelForDependencies(lines) {
        if (lines >= 11) {
            return table_formatter_1.FORMAT_LEVEL.STRICT;
        }
        else if (lines >= 6) {
            return table_formatter_1.FORMAT_LEVEL.WARNING;
        }
        else {
            return table_formatter_1.FORMAT_LEVEL.OK;
        }
    }
    getFormatLevelForPublicMethods(lines) {
        if (lines >= 9) {
            return table_formatter_1.FORMAT_LEVEL.STRICT;
        }
        else if (lines >= 4) {
            return table_formatter_1.FORMAT_LEVEL.WARNING;
        }
        else {
            return table_formatter_1.FORMAT_LEVEL.OK;
        }
    }
    getFormatLevelForPrivateMethods(lines) {
        if (lines >= 9) {
            return table_formatter_1.FORMAT_LEVEL.STRICT;
        }
        else if (lines >= 6) {
            return table_formatter_1.FORMAT_LEVEL.WARNING;
        }
        else {
            return table_formatter_1.FORMAT_LEVEL.OK;
        }
    }
    getFormatLevelForClassLines(lines) {
        if (lines >= 130) {
            return table_formatter_1.FORMAT_LEVEL.STRICT;
        }
        else if (lines >= 80) {
            return table_formatter_1.FORMAT_LEVEL.WARNING;
        }
        else {
            return table_formatter_1.FORMAT_LEVEL.OK;
        }
    }
}
exports.CliTable = CliTable;
//# sourceMappingURL=cli-table.js.map