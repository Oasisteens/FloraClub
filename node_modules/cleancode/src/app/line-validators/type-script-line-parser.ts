export const METHOD_START_REGEXP = /([a-zA-Z]\w+)\(.*\).*{/g;
export const START_BRACES = /{/g;
export const END_BRACKET = /}/g;
export const MORE_THAN_THREE_ARGUMENTS = /\(.+,.+,.+\,.+\)/g;
export const ES6_CALLBACK = /=>\s*{/g;
export const CLASS_DEFINITION = /class\s+(\w+)/g;
export const PRIVATE_METHOD_DEFINITION = /private\s+(\w+\s)?\w+(\s*<\w+>)?\s*\(.*/g;
export const PUBLIC_METHOD_DEFINITION = /^\s*(?!function|private|return)(@Input\(\)\s*)?(public\s+)?(\w+\s)?\w+(\s*<\w+>)?\s*\(.*/g;
export const IMPORT_STATEMENT = /^\s*import.+/g;
export const IMPORT_STATEMENT_WITH_CLASSES = /^\s*import\s+{(.+)}.+/g;

export class TypeScriptLineParser {

    public hasFunctionDefinition(line: string): boolean {
        return !!line.match(METHOD_START_REGEXP);
    }

    public hasStartBracket(line: string): boolean {
        return !!line.match(START_BRACES);
    }

    public hasEndBracket(line: string): boolean {
        return !!line.match(END_BRACKET);
    }

    public hasFunctionMoreThanThreeArguments(line: string): boolean {
        return !!line.match(MORE_THAN_THREE_ARGUMENTS);
    }

    public hasES6CallBack(line: string): boolean {
        return !!line.match(ES6_CALLBACK);
    }

    public hasClassDefinition(line: string): boolean {
        return !!line.match(CLASS_DEFINITION);
    }

    public hasPrivateMethodDefinition(line: string): boolean {
        return !!line.match(PRIVATE_METHOD_DEFINITION);
    }

    public hasPublicMethodDefinition(line: string): boolean {
        return !!line.match(PUBLIC_METHOD_DEFINITION);
    }

    public getClassName(line: string): string {
        const match = new RegExp(CLASS_DEFINITION).exec(line);
        return match[1];
    }

    public getDependencyCountFromImportLine(line: string): number {
        const match = new RegExp(IMPORT_STATEMENT_WITH_CLASSES).exec(line);
        const importClassesGroup = match && match[1];

        if(importClassesGroup) {
            return importClassesGroup.split(',').length;
        } else {
            return 1;
        }
    }

    public hasImportStatement(line: string): boolean {
        return !!line.match(IMPORT_STATEMENT);
    }

    public countStartBracket(line: string): number {
        const match = line.match(START_BRACES);
        return match ? match.length : 0;
    }

    public countEndBracket(line: string): number {
        const match = line.match(END_BRACKET);
        return match ? match.length : 0;
    }
}
