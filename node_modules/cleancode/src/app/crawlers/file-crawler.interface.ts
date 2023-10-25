import {IFileParser} from "../file-parsers/file-parser.interface";

export interface IFileCrawler {
    addFileParser(fileParser: IFileParser): void;
    process(): Promise<void>;
    printReport(): void;
    getScore(): number;
}
