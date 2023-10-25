import {IFileCrawler} from "./file-crawler.interface";
import {DummyFileCrawler} from "./dummy-file-crawler";
import {IFileCrawlerFactory} from "./file-crawler-factory.interface";

export class DummyFileCrawlerFactory implements IFileCrawlerFactory {

    public instantiate(path): IFileCrawler {
        return new DummyFileCrawler();
    }


}