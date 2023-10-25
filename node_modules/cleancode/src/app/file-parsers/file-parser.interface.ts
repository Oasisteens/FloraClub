export interface IFileParser {
    start(filePath: string): void;
    readLine(lineString: string): void;
    stop(): void;
}
