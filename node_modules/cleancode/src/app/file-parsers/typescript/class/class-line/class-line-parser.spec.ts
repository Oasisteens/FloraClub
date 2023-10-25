import {expect} from 'chai';
import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import {TypeScriptClassReporter} from "../../../../reporters/typescript/type-script-class-reporter";
import {TypeScriptLineParser} from "../../../../line-validators/type-script-line-parser";
import {TypescriptClassLineParser} from "./class-line-parser";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Typescript Class Line Parser', () => {

    let classLineParser: TypescriptClassLineParser;
    let reporter: TypeScriptClassReporter;
    let lineParser: TypeScriptLineParser;

    beforeEach((() => {
        reporter = {
            print: sinon.spy(),
            reportClassLines: sinon.spy()
        } as any;
        lineParser = new TypeScriptLineParser();
        classLineParser = new TypescriptClassLineParser(reporter, lineParser);
        classLineParser.start('filePath');
    }));

    it('should be properly created', () => {
        expect(classLineParser).to.be.instanceof(TypescriptClassLineParser);
    });

    it('should report correct lines count', () => {
        classLineParser.readLine('...');
        classLineParser.readLine('...');
        classLineParser.readLine('...');
        classLineParser.stop();

        expect(reporter.reportClassLines).to.have.been.calledWith(3);
    });

});
