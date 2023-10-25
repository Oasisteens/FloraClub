"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockFileCrawler {
    constructor(score, printReportSpy) {
        this.score = score;
        this.printReportSpy = printReportSpy;
    }
    getScore() {
        return this.score;
    }
    printReport() {
        this.printReportSpy(this.score);
    }
    addFileParser(fileParser) {
    }
    process() {
        return null;
    }
}
exports.MockFileCrawler = MockFileCrawler;
//# sourceMappingURL=mock-file-crawler.js.map