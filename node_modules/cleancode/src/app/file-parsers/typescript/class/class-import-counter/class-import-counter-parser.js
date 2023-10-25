"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_parser_1 = require("../../../file-parser");
class TypescriptClassImportCounterParser extends file_parser_1.FileParser {
    constructor(reporter, lineParser) {
        super(lineParser);
        this.reporter = reporter;
        this.lineParser = lineParser;
        this.dependencyCount = 0;
    }
    readLine(line) {
        super.readLine(line);
        if (this.lineParser.hasImportStatement(line)) {
            this.dependencyCount += this.lineParser.getDependencyCountFromImportLine(line);
        }
    }
    stop() {
        this.reporter.reportDependencyCount(this.dependencyCount);
    }
}
exports.TypescriptClassImportCounterParser = TypescriptClassImportCounterParser;
//# sourceMappingURL=class-import-counter-parser.js.map