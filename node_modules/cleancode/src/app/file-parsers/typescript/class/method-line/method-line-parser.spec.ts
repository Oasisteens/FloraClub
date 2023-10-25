import {expect} from 'chai';
import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import {TypeScriptClassReporter} from "../../../../reporters/typescript/type-script-class-reporter";
import {TypeScriptLineParser} from "../../../../line-validators/type-script-line-parser";
import {TypescriptMethodLineParser} from "./method-line-parser";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Typescript Method Line Parser', () => {

    let methodLineParser: TypescriptMethodLineParser;
    let reporter: TypeScriptClassReporter;
    let lineParser: TypeScriptLineParser;

    beforeEach((() => {
        reporter = {
            print: sinon.spy(),
            reportMethodLineCount: sinon.spy()
        } as any;
        lineParser = new TypeScriptLineParser();
        methodLineParser = new TypescriptMethodLineParser(reporter, lineParser);
        methodLineParser.start('foo');
    }));


    it('should be properly created', () => {
        expect(methodLineParser).to.be.instanceof(TypescriptMethodLineParser);
    });

    it('should report 2 lines for 1 method', () => {
        methodLineParser.readLine('private foo() {');
        methodLineParser.readLine('bar()');
        methodLineParser.readLine('foo()');
        methodLineParser.readLine('}');

        expect(reporter.reportMethodLineCount).to.have.been.calledWith(2);
    });

    it('should report lines count for 2 methods', () => {
        methodLineParser.readLine('private foo() {');
        methodLineParser.readLine('bar()');
        methodLineParser.readLine('foo()');
        methodLineParser.readLine('}');
        methodLineParser.readLine('public bar() {');
        methodLineParser.readLine('foo()');
        methodLineParser.readLine('}');

        expect(reporter.reportMethodLineCount).to.have.been.calledWith(2);
        expect(reporter.reportMethodLineCount).to.have.been.calledWith(1);
        expect(reporter.reportMethodLineCount).to.have.been.calledTwice;
    });

});
