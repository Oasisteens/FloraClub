import {IDirectoryCrawler} from "./directory-crawler.interface";

export class DummyDirectoryCrawler implements IDirectoryCrawler {

    public recursive(path: string): Promise<Array<string>> {
        return null;
    }

}