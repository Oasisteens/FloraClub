import {expect} from 'chai';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import {BasicScoreCounter} from "./basic-score-counter";
import {IReporter, Report} from "../reporters/reporter.interface";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('BasicScoreCounter', () => {

    let basicScoreCounter: BasicScoreCounter;
    let reporter: IReporter;

    beforeEach((() => {
        reporter = {
            getReport: sinon.stub()
        };
        basicScoreCounter = new BasicScoreCounter(reporter);
    }));

    it('should be properly created', () => {
        expect(basicScoreCounter).to.be.instanceof(BasicScoreCounter);
    });

    it('should count higher score for more dependencies than method lines', () => {
        const dependenciesScore = countForReport({
            DEPENDENCIES: 15,
        });

        expect(dependenciesScore).to.be.greaterThan(countForReport({ MAX_METHOD_LINES: 15, PRIVATE_METHODS: 7, PUBLIC_METHODS: 5 }));
        expect(dependenciesScore).to.be.greaterThan(countForReport({ MAX_METHOD_LINES: 15, PRIVATE_METHODS: 9, PUBLIC_METHODS: 8 }));
        expect(dependenciesScore).to.be.greaterThan(countForReport({ MAX_METHOD_LINES: 15, PRIVATE_METHODS: 14, PUBLIC_METHODS: 5 }));
    });

    it('should count higher score for a lot of method lines than dependencies', () => {
        const dependenciesScore = countForReport({
            DEPENDENCIES: 15,
        });

        expect(countForReport({ MAX_METHOD_LINES: 23, AVERAGE_METHOD_LINES: 8.5})).to.be.greaterThan(dependenciesScore);
        expect(countForReport({ MAX_METHOD_LINES: 21, AVERAGE_METHOD_LINES: 8.0})).to.be.greaterThan(dependenciesScore);
        expect(countForReport({ MAX_METHOD_LINES: 19, AVERAGE_METHOD_LINES: 7.5})).to.be.greaterThan(dependenciesScore);
    });

    function countForReport(report): number {
        const defaultReport: Report = {
            AVERAGE_METHOD_LINES: 0,
            MAX_METHOD_LINES: 0,
            CLASS_NAME: 'foo',
            CLASS_LINES: 0,
            DEPENDENCIES: 0,
            PRIVATE_METHODS: 0,
            PUBLIC_METHODS: 0
        };
        reporter.getReport = sinon.stub().returns({...defaultReport, ...report});
        return basicScoreCounter.count();
    }

});
