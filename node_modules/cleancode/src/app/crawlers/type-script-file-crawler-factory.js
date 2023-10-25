"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_crawler_1 = require("./file-crawler");
const line_reader_1 = require("../line-readers/line-reader");
const type_script_line_parser_1 = require("../line-validators/type-script-line-parser");
const type_script_class_parser_1 = require("../file-parsers/typescript/class/type-script-class-parser");
const type_script_class_reporter_1 = require("../reporters/typescript/type-script-class-reporter");
const method_counter_parser_1 = require("../file-parsers/typescript/class/method-counter/method-counter-parser");
const method_line_parser_1 = require("../file-parsers/typescript/class/method-line/method-line-parser");
const class_line_parser_1 = require("../file-parsers/typescript/class/class-line/class-line-parser");
const class_import_counter_parser_1 = require("../file-parsers/typescript/class/class-import-counter/class-import-counter-parser");
const basic_score_counter_1 = require("../score-counters/basic-score-counter");
const cli_table_1 = require("../printers/cli-table");
class TypeScriptFileCrawlerFactory {
    constructor(Table, tableFormatter) {
        this.Table = Table;
        this.tableFormatter = tableFormatter;
    }
    instantiate(path) {
        const fileReporter = new type_script_class_reporter_1.TypeScriptClassReporter();
        const table = new cli_table_1.CliTable(this.Table, fileReporter, this.tableFormatter);
        const scoreCounter = new basic_score_counter_1.BasicScoreCounter(fileReporter);
        const fileCrawler = new file_crawler_1.FileCrawler(path, new line_reader_1.LineReader(path), scoreCounter, table);
        this.initFileParsers(fileCrawler, fileReporter);
        return fileCrawler;
    }
    initFileParsers(fileCrawler, fileReporter) {
        const lineParser = new type_script_line_parser_1.TypeScriptLineParser();
        const classParser = new type_script_class_parser_1.TypescriptClassParser(lineParser, [
            new class_line_parser_1.TypescriptClassLineParser(fileReporter, lineParser),
            new method_counter_parser_1.TypescriptMethodCounterParser(fileReporter, lineParser),
            new method_line_parser_1.TypescriptMethodLineParser(fileReporter, lineParser),
        ], fileReporter);
        fileCrawler.addFileParser(classParser);
        fileCrawler.addFileParser(new class_import_counter_parser_1.TypescriptClassImportCounterParser(fileReporter, lineParser));
    }
}
exports.TypeScriptFileCrawlerFactory = TypeScriptFileCrawlerFactory;
//# sourceMappingURL=type-script-file-crawler-factory.js.map