import {expect} from 'chai';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import {FileParser} from "./file-parser";
import {TypeScriptLineParser} from "../line-validators/type-script-line-parser";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('FileParser', () => {

    let fileParser: FileParser;
    let lineParser: TypeScriptLineParser;

    beforeEach((() => {
        lineParser = new TypeScriptLineParser();
        fileParser = new FileParser(lineParser);
    }));

    it('should be properly created', () => {
        expect(fileParser).to.be.instanceof(FileParser);
    });

});
