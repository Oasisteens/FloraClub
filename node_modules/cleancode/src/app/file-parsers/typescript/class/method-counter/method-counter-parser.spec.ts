import {expect} from 'chai';
import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import {TypescriptMethodCounterParser} from "./method-counter-parser";
import {TypeScriptClassReporter} from "../../../../reporters/typescript/type-script-class-reporter";
import {TypeScriptLineParser} from "../../../../line-validators/type-script-line-parser";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Typescript Method Counter Parser', () => {

    let methodCounterParser: TypescriptMethodCounterParser;
    let reporter: TypeScriptClassReporter;
    let lineParser: TypeScriptLineParser;

    beforeEach((() => {
        reporter = {
            print: sinon.spy(),
            reportPrivateMethod: sinon.spy(),
            reportPublicMethod: sinon.spy()
        } as any;
        lineParser = new TypeScriptLineParser();
        methodCounterParser = new TypescriptMethodCounterParser(reporter, lineParser);
        methodCounterParser.start('foo');
    }));


    it('should be properly created', () => {
        expect(methodCounterParser).to.be.instanceof(TypescriptMethodCounterParser);
    });

    it('should report nothing if code does not contain any methods', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).not.to.have.been.called;
    });

    it('should report private method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('private foo() {');
        methodCounterParser.readLine('}');
        methodCounterParser.readLine('private foo    () {');
        methodCounterParser.readLine('}');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).to.have.been.calledTwice;
    });

    it('should report private method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('private foo() {return 3;}');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).to.have.been.calledOnce;
    });

    it('should report private method', () => {
        methodCounterParser.readLine('private foo() {');
        methodCounterParser.readLine('  if (a > 10) {');
        methodCounterParser.readLine('      sum(44);');
        methodCounterParser.readLine('  }');
        methodCounterParser.readLine('}');

        expect(reporter.reportPrivateMethod).to.have.been.calledOnce;
    });

    it('should report explicit private method which is longer than 1 line', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('private foo(blub: Jajaja, another: any');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).to.have.been.calledOnce;
    });

    it('should report private ASYNC method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('private async bleb() {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).to.have.been.calledOnce;
    });

    it('should report private ASYNC method with arguments', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('private async bleb(bar, blub, jep) {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPrivateMethod).to.have.been.calledOnce;
    });

    it('should report explicit public method and ignore content', () => {
        methodCounterParser.readLine('public foo() {');
        methodCounterParser.readLine('  if (a > 10) {');
        methodCounterParser.readLine('      sum(44);');
        methodCounterParser.readLine('  }');
        methodCounterParser.readLine('}');

        expect(reporter.reportPublicMethod).to.have.been.calledOnce;
    });

    it('should NOT report public method for edge cases', () => {
        methodCounterParser.readLine('return (index + 1).toString().indexOf(searchedWord) === 0;');

        expect(reporter.reportPublicMethod).not.to.have.been.called;
    });

    it('should NOT report public method for edge cases', () => {
        methodCounterParser.readLine('return (index + 1).toString().indexOf(searchedWord) === 0;');

        expect(reporter.reportPublicMethod).not.to.have.been.called;
    });

    it('should report public method for edge cases', () => {
        methodCounterParser.readLine('public sendQuery<T>(actionName: string, data: any,');
        methodCounterParser.readLine('public sendQuery  <T>(actionName: string, data: any,');
        methodCounterParser.readLine('@Input() set sendQuery  <T>(actionName: string, data: any,');
        methodCounterParser.readLine('@Input()set sendQuery  <T>(actionName: string, data: any,');
        methodCounterParser.readLine('@Input()public set sendQuery  <T>(actionName: string, data: any,');

        expect(reporter.reportPublicMethod).to.have.been.callCount(5);
    });

    it('should report private method for edge cases', () => {
        methodCounterParser.readLine('private sendQuery<T>(actionName: string, data: any,');
        methodCounterParser.readLine('private sendQuery  <T>(actionName: string, data: any,');

        expect(reporter.reportPrivateMethod).to.have.been.calledTwice;
    });

    it('should NOT ignore constructor', () => {
        methodCounterParser.readLine('constructor() {');
        methodCounterParser.readLine('  if (a > 10) {');
        methodCounterParser.readLine('      sum(44);');
        methodCounterParser.readLine('  }');
        methodCounterParser.readLine('}');

        expect(reporter.reportPublicMethod).to.have.been.calledOnce;
    });

    it('should report explicit public method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('public foo() {');
        methodCounterParser.readLine('}');
        methodCounterParser.readLine('public foo  () {');
        methodCounterParser.readLine('}');
        methodCounterParser.readLine('  public foo  () {');
        methodCounterParser.readLine('}');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPublicMethod).to.have.been.calledThrice;
    });

    it('should report explicit public method which is longer than 1 line', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('public foo(blub: Jajaja, another: any');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPublicMethod).to.have.been.calledOnce;
    });

    it('should report explicit public ASYNC method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('public async bleb() {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPublicMethod).to.have.been.calledOnce;
    });

    it('should report explicit public ASYNC method with arguments', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('public async bleb(bar, blub, jep) {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPublicMethod).to.have.been.calledOnce;
    });

    it('should report implicit public method', () => {
        methodCounterParser.readLine('foo');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('foo() {');
        methodCounterParser.readLine('const = () => {');

        expect(reporter.reportPublicMethod).to.have.been.calledOnce;
    });

    it('should NOT report public method', () => {
        methodCounterParser.readLine('const fofo = () => {');
        methodCounterParser.readLine('const blouf = 434;');
        methodCounterParser.readLine('function foo() {');
        methodCounterParser.readLine('private blub() {');

        expect(reporter.reportPublicMethod).not.to.have.been.called;
    });

});
