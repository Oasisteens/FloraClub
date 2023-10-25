import {IReporter, Report} from "./reporter.interface";

export class DummyReporter implements IReporter {

    print(): void {
    }

    getReport(): Report {
        return null;
    }


    public report(msg: string): void {
    }
}