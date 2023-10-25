import {IReporter, Report} from "../reporters/reporter.interface";
import {PrintableTable, Table} from "./table";
import {FORMAT_LEVEL, TableFormatter} from "../table-formatters/table-formatter";
import {ConstructorOf} from "../../constructor-of.interface";

export class CliTable implements PrintableTable{

    constructor(private Table: ConstructorOf<Table>, private reporter: IReporter, private formatter: TableFormatter) {

    }

    public print(): void {
        const report = this.reporter.getReport();

        if( ! report.CLASS_NAME) {
            return;
        }

        const table = this.instantiate(report.CLASS_NAME);
        this.fillTable(table, report);

        console.log(table.toString());
    }

    private instantiate(className: string): Table {
        return new this.Table({
            head: [
                this.formatter.formatClassName(className),
                this.formatter.formatHeaderValue('Value'),
                this.formatter.formatHeaderValue('Average'),
                this.formatter.formatHeaderValue('Max')
            ]
        });
    }

    private fillTable(table: Table, report: Report): void {
        table.push(
            [this.formatter.formatName('Class lines'), this.formatter.formatValue(report.CLASS_LINES, this.getFormatLevelForClassLines(report.CLASS_LINES))],
            [this.formatter.formatName('Public methods'), this.formatter.formatValue(report.PUBLIC_METHODS, this.getFormatLevelForPublicMethods(report.PUBLIC_METHODS))],
            [this.formatter.formatName('Private methods'), this.formatter.formatValue(report.PRIVATE_METHODS, this.getFormatLevelForPrivateMethods(report.PRIVATE_METHODS))],
            [this.formatter.formatName('Dependencies'), this.formatter.formatValue(report.DEPENDENCIES, this.getFormatLevelForDependencies(report.DEPENDENCIES))],
            [this.formatter.formatName('Method lines'), '',
                this.formatter.formatValue(
                    report.AVERAGE_METHOD_LINES, this.getFormatLevelForAverageMethodLinesCount(report.AVERAGE_METHOD_LINES)
                ),
                this.formatter.formatValue(
                    report.MAX_METHOD_LINES, this.getFormatLevelForMaxMethodLinesCount(report.MAX_METHOD_LINES)
                )
            ]
        );
    }

    private getFormatLevelForMaxMethodLinesCount(lines: number): FORMAT_LEVEL {
        if(lines >= 8) {
            return FORMAT_LEVEL.STRICT
        } else if(lines >= 6) {
            return FORMAT_LEVEL.WARNING;
        } else {
            return FORMAT_LEVEL.OK;
        }
    }

    private getFormatLevelForAverageMethodLinesCount(lines: number): FORMAT_LEVEL {
        if(lines >= 7) {
            return FORMAT_LEVEL.STRICT
        } else if(lines >= 5) {
            return FORMAT_LEVEL.WARNING;
        } else {
            return FORMAT_LEVEL.OK;
        }
    }

    private getFormatLevelForDependencies(lines: number): FORMAT_LEVEL {
        if(lines >= 11) {
            return FORMAT_LEVEL.STRICT
        } else if(lines >= 6) {
            return FORMAT_LEVEL.WARNING;
        } else {
            return FORMAT_LEVEL.OK;
        }
    }

    private getFormatLevelForPublicMethods(lines: number): FORMAT_LEVEL {
        if(lines >= 9) {
            return FORMAT_LEVEL.STRICT
        } else if(lines >= 4) {
            return FORMAT_LEVEL.WARNING;
        } else {
            return FORMAT_LEVEL.OK;
        }
    }

    private getFormatLevelForPrivateMethods(lines: number): FORMAT_LEVEL {
        if(lines >= 9) {
            return FORMAT_LEVEL.STRICT
        } else if(lines >= 6) {
            return FORMAT_LEVEL.WARNING;
        } else {
            return FORMAT_LEVEL.OK;
        }
    }

    private getFormatLevelForClassLines(lines: number): FORMAT_LEVEL {
        if(lines >= 130) {
            return FORMAT_LEVEL.STRICT
        } else if(lines >= 80) {
            return FORMAT_LEVEL.WARNING;
        } else {
            return FORMAT_LEVEL.OK;
        }
    }

}