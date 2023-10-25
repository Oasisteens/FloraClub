"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dummy_file_crawler_1 = require("./dummy-file-crawler");
class DummyFileCrawlerFactory {
    instantiate(path) {
        return new dummy_file_crawler_1.DummyFileCrawler();
    }
}
exports.DummyFileCrawlerFactory = DummyFileCrawlerFactory;
//# sourceMappingURL=dummy-file-crawler-factory.js.map