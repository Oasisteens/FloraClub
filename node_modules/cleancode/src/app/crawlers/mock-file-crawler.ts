import {IFileCrawler} from "./file-crawler.interface";
import {IFileParser} from "../file-parsers/file-parser.interface";

export class MockFileCrawler implements IFileCrawler {

    constructor(private score: number, private printReportSpy: any) {

    }

    getScore(): number {
        return this.score;
    }

    printReport(): void {
        this.printReportSpy(this.score);
    }

    public addFileParser(fileParser: IFileParser): void {
    }

    public process(): Promise<void> {
        return null;
    }

}

