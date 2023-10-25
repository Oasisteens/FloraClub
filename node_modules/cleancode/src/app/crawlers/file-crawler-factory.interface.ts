import {IFileCrawler} from "./file-crawler.interface";

export interface IFileCrawlerFactory {
    instantiate(path): IFileCrawler;
}