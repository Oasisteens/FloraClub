import {ScoreCounter} from "./score-counter";
import {IReporter, Report} from "../reporters/reporter.interface";

export const COEFFICIENTS = {
    AVERAGE_METHOD_LINES: 1.8,
    PUBLIC_METHODS: 1.5,
    DEPENDENCIES: 2.5,
    MAX_METHOD_LINES: 1.6
};

export class BasicScoreCounter implements ScoreCounter {

    constructor(private reporter: IReporter) {

    }

    public count(): number {
        const report = this.reporter.getReport();
        return this.countScore(report);
    }

    private countScore(report: Report): number {
        let result = 0;

        for (const key in report) {
            result += report[key] * COEFFICIENTS[key] || 1;
        }

        return result;
    }
}