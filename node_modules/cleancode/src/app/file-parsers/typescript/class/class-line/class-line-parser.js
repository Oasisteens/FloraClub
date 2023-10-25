"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_parser_1 = require("../../../file-parser");
class TypescriptClassLineParser extends file_parser_1.FileParser {
    constructor(reporter, lineParser) {
        super(lineParser);
        this.reporter = reporter;
        this.lineParser = lineParser;
        this.lineCount = 0;
    }
    stop() {
        this.reporter.reportClassLines(this.lineCount);
    }
    readLine(line) {
        super.readLine(line);
        this.lineCount++;
    }
}
exports.TypescriptClassLineParser = TypescriptClassLineParser;
//# sourceMappingURL=class-line-parser.js.map