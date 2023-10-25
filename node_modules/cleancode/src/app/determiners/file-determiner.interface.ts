export interface IFileDeterminer {
    isDirectory(filePath: string): Promise<boolean>;
    isFile(filePath: string): Promise<boolean>;
}