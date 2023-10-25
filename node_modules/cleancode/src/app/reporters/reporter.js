"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeScriptFileReporter {
    print() {
    }
    report(msg, path, lineNumber) {
        console.log(`${msg} in path "${path}${this.printLineNumber(lineNumber)}"`);
    }
    printLineNumber(lineNumber) {
        return lineNumber ? `:${lineNumber}` : '';
    }
}
exports.TypeScriptFileReporter = TypeScriptFileReporter;
//# sourceMappingURL=reporter.js.map