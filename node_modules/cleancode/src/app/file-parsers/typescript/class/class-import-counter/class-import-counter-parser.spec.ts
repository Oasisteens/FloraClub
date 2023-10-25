import {expect} from 'chai';
import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import {TypescriptClassImportCounterParser} from "./class-import-counter-parser";
import {TypeScriptLineParser} from "../../../../line-validators/type-script-line-parser";
import {TypeScriptClassReporter} from "../../../../reporters/typescript/type-script-class-reporter";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Typescript class import counter parser', () => {

    let classImportCounter: TypescriptClassImportCounterParser;
    let reporter: TypeScriptClassReporter;
    let lineParser: TypeScriptLineParser;

    beforeEach((() => {
        reporter = {
            print: sinon.spy(),
            reportDependencyCount: sinon.spy()
        } as any;
        lineParser = new TypeScriptLineParser();
        classImportCounter = new TypescriptClassImportCounterParser(reporter, lineParser);
        classImportCounter.start('filePath');
    }));

    it('should be properly created', () => {
        expect(classImportCounter).to.be.instanceof(TypescriptClassImportCounterParser);
    });

    it('should count simple import lines with only 1 import on a line', () => {
        classImportCounter.readLine('import {Blabla} from "blub"');
        classImportCounter.readLine('import * as _ from "lodash"');
        classImportCounter.readLine('import * from "blub"');
        classImportCounter.readLine('import {blbl} from "blub"');
        classImportCounter.readLine('some bullshit');
        classImportCounter.stop();

        expect(reporter.reportDependencyCount).to.have.been.calledWith(4);
    });

    it('should count import lines with more than 1 import on a line', () => {
        classImportCounter.readLine('import {Blabla, blob} from "blub"');
        classImportCounter.readLine('import * as _ from "lodash"');
        classImportCounter.readLine('import * from "blub"');
        classImportCounter.readLine('import {blbl, jajajajaj} from "blub"');
        classImportCounter.readLine('some bullshit');
        classImportCounter.stop();

        expect(reporter.reportDependencyCount).to.have.been.calledWith(6);
    });

    it('should count 0 import lines if there are no imports', () => {
        classImportCounter.readLine('class Import {');
        classImportCounter.readLine('const import = 33;');
        classImportCounter.readLine('let import = {}');
        classImportCounter.readLine('class Foo');
        classImportCounter.readLine('some bullshit');
        classImportCounter.stop();

        expect(reporter.reportDependencyCount).to.have.been.calledWith(0);
    });

});
