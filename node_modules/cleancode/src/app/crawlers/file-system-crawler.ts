import {IFileCrawlerFactory} from "./file-crawler-factory.interface";
import {IFileExtensionValidator} from "../validators/file-extension-validator.interface";
import {IFileDeterminer} from "../determiners/file-determiner.interface";
import {IDirectoryCrawler} from "./directory-crawler.interface";
import {IFileCrawler} from "./file-crawler.interface";
import {DummyFileCrawler} from "./dummy-file-crawler";
import {FileCrawler} from "./file-crawler";

export class FileSystemCrawler {

    constructor(private path,
                private fileCrawlerFactory: IFileCrawlerFactory,
                private fileExtensionValidator: IFileExtensionValidator,
                private fileDeterminer: IFileDeterminer,
                private directoryCrawler: IDirectoryCrawler) {

    }

    public async start(): Promise<void> {
        try {
            await this.process();
        } catch(e) {
            console.log(`Error while parsing given path: ${e}`);
        }
    }

    private async process(): Promise<void> {
        if (await this.fileDeterminer.isDirectory(this.path)) {
            return this.parseRecursiveFolder(this.path);
        } else if (await this.fileDeterminer.isFile(this.path)) {
            const fileCrawler = await this.parseFile(this.path);
            fileCrawler.printReport();
        }
    }

    private async parseRecursiveFolder(path): Promise<void> {
        const files = await this.directoryCrawler.recursive(path);
        let fileCrawlers = await this.parseFiles(files);
        this.printCrawlersReport(fileCrawlers);
    }

    private async parseFile(path): Promise<IFileCrawler> {
        if(this.fileExtensionValidator.hasCorrectFileExtension(path)) {
            const fileCrawler = this.fileCrawlerFactory.instantiate(path);
            await fileCrawler.process();
            return fileCrawler;
        } else {
            return new DummyFileCrawler();
        }
    }

    private async parseFiles(files: Array<string>): Promise<Array<IFileCrawler>> {
        let fileCrawlers: Array<IFileCrawler> = [];

        for(const file of files) {
            fileCrawlers.push(await this.parseFile(file));
        }

        return fileCrawlers;
    }

    private printCrawlersReport(fileCrawlers: Array<IFileCrawler>): void {
        const sortedCrawlers = fileCrawlers.sort((a, b) => {
            return a.getScore() - b.getScore();
        });

        sortedCrawlers.forEach((crawler) => crawler.printReport());
    }
}