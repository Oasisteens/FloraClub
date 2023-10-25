"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_parser_1 = require("../../file-parser");
class TypescriptClassParser extends file_parser_1.FileParser {
    constructor(lineParser, classParsers, reporter) {
        super(lineParser);
        this.lineParser = lineParser;
        this.classParsers = classParsers;
        this.reporter = reporter;
        this.isProcessingClass = false;
        this.processingFinished = false;
    }
    readLine(line) {
        super.readLine(line);
        this.processEndOfClass(line);
        this.processLineIfNecessary(line);
        this.processStartOfClass(line);
    }
    processEndOfClass(line) {
        if (this.isProcessingClass && this.isEndOfTheClass(line)) {
            this.stopClassProcessing();
            this.processingFinished = true;
        }
    }
    isEndOfTheClass(line) {
        return this.lineParser.hasEndBracket(line) && this.nestingCount === 0;
    }
    processLineIfNecessary(line) {
        if (this.isProcessingClass && !this.processingFinished) {
            this.propagateLineToAllParsers(line);
        }
    }
    processStartOfClass(line) {
        if (this.lineParser.hasClassDefinition(line)) {
            this.reporter.setClassName(this.lineParser.getClassName(line));
            this.startClassProcessing();
        }
    }
    startClassProcessing() {
        if (this.isProcessingClass) {
            throw new MoreThanOneClassError('2 classes in 1 file are not allowed!');
        }
        else {
            this.classParsers.forEach((classParser) => classParser.start(this.filePath));
            this.isProcessingClass = true;
        }
    }
    stopClassProcessing() {
        this.classParsers.forEach((classParser) => classParser.stop());
    }
    propagateLineToAllParsers(line) {
        this.classParsers.forEach((classParser) => classParser.readLine(line));
    }
}
exports.TypescriptClassParser = TypescriptClassParser;
class MoreThanOneClassError extends Error {
}
exports.MoreThanOneClassError = MoreThanOneClassError;
//# sourceMappingURL=type-script-class-parser.js.map