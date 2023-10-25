export interface IDirectoryCrawler {
    recursive(path: string): Promise<Array<string>>;
}