import {FileCrawler} from "./file-crawler";
import {LineReader} from "../line-readers/line-reader";
import {TypeScriptLineParser} from "../line-validators/type-script-line-parser";
import {TypescriptClassParser} from "../file-parsers/typescript/class/type-script-class-parser";
import {TypeScriptClassReporter} from "../reporters/typescript/type-script-class-reporter";
import {TypescriptMethodCounterParser} from "../file-parsers/typescript/class/method-counter/method-counter-parser";
import {TypescriptMethodLineParser} from "../file-parsers/typescript/class/method-line/method-line-parser";
import {TableFormatter} from "../table-formatters/table-formatter";
import {TypescriptClassLineParser} from "../file-parsers/typescript/class/class-line/class-line-parser";
import {TypescriptClassImportCounterParser} from "../file-parsers/typescript/class/class-import-counter/class-import-counter-parser";
import {BasicScoreCounter} from "../score-counters/basic-score-counter";
import {CliTable} from "../printers/cli-table";
import {Table} from "../printers/table";
import {ConstructorOf} from "../../constructor-of.interface";

export class TypeScriptFileCrawlerFactory {

    constructor(private Table: ConstructorOf<Table>, private tableFormatter: TableFormatter) {
    }

    public instantiate(path): FileCrawler {
        const fileReporter = new TypeScriptClassReporter();
        const table = new CliTable(this.Table, fileReporter, this.tableFormatter);
        const scoreCounter = new BasicScoreCounter(fileReporter);
        const fileCrawler = new FileCrawler(path, new LineReader(path), scoreCounter, table);

        this.initFileParsers(fileCrawler, fileReporter);

        return fileCrawler;
    }

    private initFileParsers(fileCrawler: FileCrawler, fileReporter): void {
        const lineParser = new TypeScriptLineParser();
        const classParser = new TypescriptClassParser(lineParser, [
            new TypescriptClassLineParser(fileReporter, lineParser),
            new TypescriptMethodCounterParser(fileReporter, lineParser),
            new TypescriptMethodLineParser(fileReporter, lineParser),
        ], fileReporter);

        fileCrawler.addFileParser(classParser);
        fileCrawler.addFileParser(new TypescriptClassImportCounterParser(fileReporter, lineParser));
    }
}