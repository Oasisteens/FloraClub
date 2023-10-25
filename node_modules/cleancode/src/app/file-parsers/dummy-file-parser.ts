import {IFileParser} from "./file-parser.interface";

export class DummyFileParser implements IFileParser{
    start(filePath: string): void {
    }

    readLine(lineString: string): void {
    }

    stop(): void {
    }

}