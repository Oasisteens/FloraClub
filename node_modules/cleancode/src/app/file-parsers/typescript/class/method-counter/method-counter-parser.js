"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_parser_1 = require("../../../file-parser");
class TypescriptMethodCounterParser extends file_parser_1.FileParser {
    constructor(reporter, lineParser) {
        super(lineParser);
        this.reporter = reporter;
        this.lineParser = lineParser;
    }
    readLine(line) {
        super.readLine(line);
        if (this.nestingCount == 0 && this.lineParser.hasPrivateMethodDefinition(line)) {
            this.reporter.reportPrivateMethod();
        }
        if (this.nestingCount == 0 && this.lineParser.hasPublicMethodDefinition(line)) {
            this.reporter.reportPublicMethod();
        }
    }
}
exports.TypescriptMethodCounterParser = TypescriptMethodCounterParser;
//# sourceMappingURL=method-counter-parser.js.map