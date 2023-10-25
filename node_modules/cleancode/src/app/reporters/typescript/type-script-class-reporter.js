"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeScriptClassReporter {
    constructor() {
        this.dependencyCount = 0;
        this.classLines = 0;
        this.privateMethodsCount = 0;
        this.publicMethodsCount = 0;
        this.methodLineCountList = [];
    }
    getReport() {
        return {
            DEPENDENCIES: this.dependencyCount,
            CLASS_LINES: this.classLines,
            CLASS_NAME: this.className,
            PUBLIC_METHODS: this.publicMethodsCount,
            PRIVATE_METHODS: this.privateMethodsCount,
            AVERAGE_METHOD_LINES: this.getAverageMethodLinesCount(),
            MAX_METHOD_LINES: this.getMaxMethodLinesCount()
        };
    }
    getAverageMethodLinesCount() {
        return this.calculateAverageLines() || null;
    }
    getMaxMethodLinesCount() {
        return this.methodLineCountList.length ? Math.max(...this.methodLineCountList) : null;
    }
    setClassName(name) {
        this.className = name;
    }
    reportClassLines(lines) {
        this.classLines = lines;
    }
    reportPrivateMethod() {
        this.privateMethodsCount++;
    }
    reportPublicMethod() {
        this.publicMethodsCount++;
    }
    reportDependencyCount(count) {
        this.dependencyCount = count;
    }
    reportMethodLineCount(count) {
        this.methodLineCountList.push(count);
    }
    calculateAverageLines() {
        let sum = 0;
        this.methodLineCountList.forEach((count) => sum += count);
        return this.round(sum / this.methodLineCountList.length);
    }
    round(number) {
        return Math.round(number * 100) / 100;
    }
}
exports.TypeScriptClassReporter = TypeScriptClassReporter;
//# sourceMappingURL=type-script-class-reporter.js.map