import {FileParser} from "../../../file-parser";
import {TypeScriptClassReporter} from "../../../../reporters/typescript/type-script-class-reporter";
import {TypeScriptLineParser} from "../../../../line-validators/type-script-line-parser";

export class TypescriptMethodLineParser extends FileParser {

    private isProcessing = false;
    private lineCount: number = 0;

    constructor(private reporter: TypeScriptClassReporter, protected lineParser: TypeScriptLineParser) {
        super(lineParser);
    }

    public readLine(line) {
        super.readLine(line);

        if (this.isProcessing && ! this.isEndOfProcessingFunction(line)) {
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

    private isEndOfProcessingFunction(line: string): boolean {
        return this.isProcessing && this.nestingCount === 0 && this.lineParser.hasEndBracket(line);
    }

}
