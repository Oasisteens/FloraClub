import {FileCrawler} from "./file-crawler";
import {DummyFileParser} from "../file-parsers/dummy-file-parser";
import * as sinon from 'sinon';
import {DummyLineReader} from "../line-readers/dummy-line-reader";
import {LineReader} from "../line-readers/line-reader";
import {DummyTable} from "../printers/dummy-table";
import {DummyScoreCounter} from "../score-counters/dummy-score-counter";

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("File Crawler", () => {

    it('should call process method for newly added file parser', () => {
        const fileCrawler = new FileCrawler('some dir path', new DummyLineReader(), new DummyScoreCounter(), new DummyTable());
        const fileParser = new DummyFileParser();
        const startMethod = sinon.spy(fileParser, 'start');

        fileCrawler.addFileParser(fileParser);
        fileCrawler.process();

        expect(startMethod.calledOnce).to.eq(true);
    });

    it('should properly crawl a file', async () => {
        const pathToCrawl = __filename;
        const fileCrawler = new FileCrawler(pathToCrawl, new LineReader(pathToCrawl), new DummyScoreCounter(), new DummyTable());
        const fileParser = new DummyFileParser();
        const sandbox = sinon.sandbox.create();
        const startSpy = sandbox.spy(fileParser, 'start');
        const readLineSpy = sandbox.spy(fileParser, 'readLine');

        fileCrawler.addFileParser(fileParser);
        await fileCrawler.process();

        sinon.assert.calledOnce(startSpy);
        sinon.assert.called(readLineSpy);
        sandbox.restore();
    });

});
