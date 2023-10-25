"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dummy_file_crawler_1 = require("./dummy-file-crawler");
class FileSystemCrawler {
    constructor(path, fileCrawlerFactory, fileExtensionValidator, fileDeterminer, directoryCrawler) {
        this.path = path;
        this.fileCrawlerFactory = fileCrawlerFactory;
        this.fileExtensionValidator = fileExtensionValidator;
        this.fileDeterminer = fileDeterminer;
        this.directoryCrawler = directoryCrawler;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.process();
            }
            catch (e) {
                console.log(`Error while parsing given path: ${e}`);
            }
        });
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.fileDeterminer.isDirectory(this.path)) {
                return this.parseRecursiveFolder(this.path);
            }
            else if (yield this.fileDeterminer.isFile(this.path)) {
                const fileCrawler = yield this.parseFile(this.path);
                fileCrawler.printReport();
            }
        });
    }
    parseRecursiveFolder(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.directoryCrawler.recursive(path);
            let fileCrawlers = yield this.parseFiles(files);
            this.printCrawlersReport(fileCrawlers);
        });
    }
    parseFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fileExtensionValidator.hasCorrectFileExtension(path)) {
                const fileCrawler = this.fileCrawlerFactory.instantiate(path);
                yield fileCrawler.process();
                return fileCrawler;
            }
            else {
                return new dummy_file_crawler_1.DummyFileCrawler();
            }
        });
    }
    parseFiles(files) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileCrawlers = [];
            for (const file of files) {
                fileCrawlers.push(yield this.parseFile(file));
            }
            return fileCrawlers;
        });
    }
    printCrawlersReport(fileCrawlers) {
        const sortedCrawlers = fileCrawlers.sort((a, b) => {
            return a.getScore() - b.getScore();
        });
        sortedCrawlers.forEach((crawler) => crawler.printReport());
    }
}
exports.FileSystemCrawler = FileSystemCrawler;
//# sourceMappingURL=file-system-crawler.js.map