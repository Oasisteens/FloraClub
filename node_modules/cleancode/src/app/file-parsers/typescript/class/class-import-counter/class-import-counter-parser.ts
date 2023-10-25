import {FileParser} from "../../../file-parser";
import {TypeScriptClassReporter} from "../../../../reporters/typescript/type-script-class-reporter";
import {TypeScriptLineParser} from "../../../../line-validators/type-script-line-parser";

export class TypescriptClassImportCounterParser extends FileParser {

    private dependencyCount: number = 0;

    constructor(private reporter: TypeScriptClassReporter, protected lineParser: TypeScriptLineParser) {
        super(lineParser);
    }

    public readLine(line) {
        super.readLine(line);

        if(this.lineParser.hasImportStatement(line)) {
            this.dependencyCount += this.lineParser.getDependencyCountFromImportLine(line);
        }
    }

    public stop(): void {
        this.reporter.reportDependencyCount(this.dependencyCount);
    }

}
