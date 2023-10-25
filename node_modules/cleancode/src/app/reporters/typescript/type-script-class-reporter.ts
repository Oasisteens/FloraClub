import {IReporter, Report} from "../reporter.interface";

export class TypeScriptClassReporter implements IReporter {

    private dependencyCount: number = 0;
    private classLines: number = 0;
    private privateMethodsCount = 0;
    private publicMethodsCount = 0;
    private className: string;
    private methodLineCountList = [];

    constructor() {

    }

    public getReport(): Report {
        return {
            DEPENDENCIES: this.dependencyCount,
            CLASS_LINES: this.classLines,
            CLASS_NAME: this.className,
            PUBLIC_METHODS: this.publicMethodsCount,
            PRIVATE_METHODS: this.privateMethodsCount,
            AVERAGE_METHOD_LINES: this.getAverageMethodLinesCount(),
            MAX_METHOD_LINES: this.getMaxMethodLinesCount()
        }
    }

    private getAverageMethodLinesCount(): number {
        return this.calculateAverageLines() || null;
    }

    private getMaxMethodLinesCount(): number {
        return this.methodLineCountList.length ? Math.max(...this.methodLineCountList) : null;
    }

    public setClassName(name: string) {
        this.className = name;
    }

    public reportClassLines(lines: number): void {
        this.classLines = lines;
    }

    public reportPrivateMethod() {
        this.privateMethodsCount++;
    }

    public reportPublicMethod() {
        this.publicMethodsCount++;
    }

    public reportDependencyCount(count: number): void {
        this.dependencyCount = count;
    }

    public reportMethodLineCount(count: number): void {
        this.methodLineCountList.push(count);
    }

    private calculateAverageLines(): number {
        let sum = 0;
        this.methodLineCountList.forEach((count) => sum+=count);

        return this.round(sum / this.methodLineCountList.length);
    }

    private round(number: number): number {
        return Math.round(number * 100) / 100;
    }
}