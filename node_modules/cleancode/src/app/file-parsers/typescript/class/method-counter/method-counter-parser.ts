import {FileParser} from "../../../file-parser";
import {TypeScriptClassReporter} from "../../../../reporters/typescript/type-script-class-reporter";
import {TypeScriptLineParser} from "../../../../line-validators/type-script-line-parser";

export class TypescriptMethodCounterParser extends FileParser {

    constructor(private reporter: TypeScriptClassReporter, protected lineParser: TypeScriptLineParser) {
        super(lineParser);
    }

    public readLine(line) {
        super.readLine(line);

        if(this.nestingCount == 0 && this.lineParser.hasPrivateMethodDefinition(line)) {
            this.reporter.reportPrivateMethod();
        }
        if(this.nestingCount == 0 && this.lineParser.hasPublicMethodDefinition(line)) {
            this.reporter.reportPublicMethod();
        }
    }

}
