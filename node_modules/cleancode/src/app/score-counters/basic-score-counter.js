"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COEFFICIENTS = {
    AVERAGE_METHOD_LINES: 1.8,
    PUBLIC_METHODS: 1.5,
    DEPENDENCIES: 2.5,
    MAX_METHOD_LINES: 1.6
};
class BasicScoreCounter {
    constructor(reporter) {
        this.reporter = reporter;
    }
    count() {
        const report = this.reporter.getReport();
        return this.countScore(report);
    }
    countScore(report) {
        let result = 0;
        for (const key in report) {
            result += report[key] * exports.COEFFICIENTS[key] || 1;
        }
        return result;
    }
}
exports.BasicScoreCounter = BasicScoreCounter;
//# sourceMappingURL=basic-score-counter.js.map