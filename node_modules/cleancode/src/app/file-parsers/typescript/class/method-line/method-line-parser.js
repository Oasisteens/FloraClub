"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_parser_1 = require("../../../file-parser");
class TypescriptMethodLineParser extends file_parser_1.FileParser {
    constructor(reporter, lineParser) {
        super(lineParser);
        this.reporter = reporter;
        this.lineParser = lineParser;
        this.isProcessing = false;
        this.lineCount = 0;
    }
    readLine(line) {
        super.readLine(line);
        if (this.isProcessing && !this.isEndOfProcessingFunction(line)) {
            this.lineCount++;
        }
        if (this.lineParser.hasPublicMethodDefinition(line) || this.lineParser.hasPrivateMethodDefinition(line)) {
            this.isProcessing = true;
        }
        if (this.isEndOfProcessingFunction(line)) {
            this.reporter.reportMethodLineCount(this.lineCount);
            this.isProcessing = false;
            this.lineCount = 0;
        }
    }
    isEndOfProcessingFunction(line) {
        return this.isProcessing && this.nestingCount === 0 && this.lineParser.hasEndBracket(line);
    }
}
exports.TypescriptMethodLineParser = TypescriptMethodLineParser;
//# sourceMappingURL=method-line-parser.js.map