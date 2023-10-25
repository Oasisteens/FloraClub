import {IFileParser} from "../file-parsers/file-parser.interface";
import {ILineReader} from "../line-readers/line-reader.interface";
import {ScoreCounter} from "../score-counters/score-counter";
import {CliTable} from "../printers/cli-table";
import {PrintableTable} from "../printers/table";
import {IFileCrawler} from "./file-crawler.interface";

export class FileCrawler implements IFileCrawler {

    private fileParsers: Array<IFileParser> = [];

    constructor(private path: string, private lineReader: ILineReader, private scoreCounter: ScoreCounter,
                private table: PrintableTable) {
    }

    public addFileParser(fileParser: IFileParser): void {
        this.fileParsers.push(fileParser);
    }

    public async process(): Promise<any> {
        return new Promise((resolve) => {
            this.startParsing();
            this.addListenersForFileCrawling(resolve);
        });
    }

    public getScore(): number {
        return this.scoreCounter.count();
    }

    public printReport(): void {
        return this.table.print();
    }

    private startParsing(): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.start(this.path));
    }

    private addListenersForFileCrawling(resolve): void {
        this.lineReader.addListener('line', (line) => this.readLine(line));
        this.lineReader.addListener('close', () => this.stopLineReading(resolve));
    }

    private readLine(line): void {
        this.fileParsers.forEach((fileParser: IFileParser) => {
            try {
                fileParser.readLine(line)
            } catch (e) {
                // console.error(e);
            }
        });
    }

    private stopLineReading(resolve): void {
        this.fileParsers.forEach((fileParser: IFileParser) => fileParser.stop());

        resolve();
    }
}

