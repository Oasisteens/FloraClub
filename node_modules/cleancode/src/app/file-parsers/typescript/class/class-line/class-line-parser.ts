import {FileParser} from "../../../file-parser";
import {TypeScriptClassReporter} from "../../../../reporters/typescript/type-script-class-reporter";
import {TypeScriptLineParser} from "../../../../line-validators/type-script-line-parser";

export class TypescriptClassLineParser extends FileParser {

    private lineCount: number = 0;

    constructor(private reporter: TypeScriptClassReporter, protected lineParser: TypeScriptLineParser) {
        super(lineParser);
    }

    public stop() {
        this.reporter.reportClassLines(this.lineCount);
    }

    public readLine(line) {
        super.readLine(line);
        this.lineCount++;
    }

}
