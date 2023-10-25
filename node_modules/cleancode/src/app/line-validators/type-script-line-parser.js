"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METHOD_START_REGEXP = /([a-zA-Z]\w+)\(.*\).*{/g;
exports.START_BRACES = /{/g;
exports.END_BRACKET = /}/g;
exports.MORE_THAN_THREE_ARGUMENTS = /\(.+,.+,.+\,.+\)/g;
exports.ES6_CALLBACK = /=>\s*{/g;
exports.CLASS_DEFINITION = /class\s+(\w+)/g;
exports.PRIVATE_METHOD_DEFINITION = /private\s+(\w+\s)?\w+(\s*<\w+>)?\s*\(.*/g;
exports.PUBLIC_METHOD_DEFINITION = /^\s*(?!function|private|return)(@Input\(\)\s*)?(public\s+)?(\w+\s)?\w+(\s*<\w+>)?\s*\(.*/g;
exports.IMPORT_STATEMENT = /^\s*import.+/g;
exports.IMPORT_STATEMENT_WITH_CLASSES = /^\s*import\s+{(.+)}.+/g;
class TypeScriptLineParser {
    hasFunctionDefinition(line) {
        return !!line.match(exports.METHOD_START_REGEXP);
    }
    hasStartBracket(line) {
        return !!line.match(exports.START_BRACES);
    }
    hasEndBracket(line) {
        return !!line.match(exports.END_BRACKET);
    }
    hasFunctionMoreThanThreeArguments(line) {
        return !!line.match(exports.MORE_THAN_THREE_ARGUMENTS);
    }
    hasES6CallBack(line) {
        return !!line.match(exports.ES6_CALLBACK);
    }
    hasClassDefinition(line) {
        return !!line.match(exports.CLASS_DEFINITION);
    }
    hasPrivateMethodDefinition(line) {
        return !!line.match(exports.PRIVATE_METHOD_DEFINITION);
    }
    hasPublicMethodDefinition(line) {
        return !!line.match(exports.PUBLIC_METHOD_DEFINITION);
    }
    getClassName(line) {
        const match = new RegExp(exports.CLASS_DEFINITION).exec(line);
        return match[1];
    }
    getDependencyCountFromImportLine(line) {
        const match = new RegExp(exports.IMPORT_STATEMENT_WITH_CLASSES).exec(line);
        const importClassesGroup = match && match[1];
        if (importClassesGroup) {
            return importClassesGroup.split(',').length;
        }
        else {
            return 1;
        }
    }
    hasImportStatement(line) {
        return !!line.match(exports.IMPORT_STATEMENT);
    }
    countStartBracket(line) {
        const match = line.match(exports.START_BRACES);
        return match ? match.length : 0;
    }
    countEndBracket(line) {
        const match = line.match(exports.END_BRACKET);
        return match ? match.length : 0;
    }
}
exports.TypeScriptLineParser = TypeScriptLineParser;
//# sourceMappingURL=type-script-line-parser.js.map