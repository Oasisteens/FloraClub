import {FileExtensionValidator} from "./file-extension-validator";
import {ExcludedFileExtensions, IncludedFileExtensions} from "../../config";
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe('FileExtensionValidator', () => {
    let includedFileExtensions: IncludedFileExtensions;
    let excludedFileExtensions: ExcludedFileExtensions;
    let fileValidator: FileExtensionValidator;

    it('should not validate file path with all incorrect extensions', () => {
        includedFileExtensions = ['ts', 'js', 'xml'];
        excludedFileExtensions = ['spec.ts'];
        initValidator();

        expect(fileValidator.hasCorrectFileExtension('foo-bar.baz')).to.equal(false);
        expect(fileValidator.hasCorrectFileExtension('foo-ts.baz')).to.equal(false);
        expect(fileValidator.hasCorrectFileExtension('foo.ts.baz')).to.equal(false);
    });

    it('should validate file path with one of the correct extension', () => {
        includedFileExtensions = ['js', 'ts'];
        excludedFileExtensions = ['spec.ts'];
        initValidator();

        expect(fileValidator.hasCorrectFileExtension('foo.ts.ts')).to.equal(true);
        expect(fileValidator.hasCorrectFileExtension('foo-baz.ts')).to.equal(true);
        expect(fileValidator.hasCorrectFileExtension('lorem-ipsum-dorem-sorem-oo-baz.ts')).to.equal(true);
    });

    it('should not validate file path with excluded file extension', () => {
        includedFileExtensions = ['js'];
        excludedFileExtensions = ['ts'];
        initValidator();

        expect(fileValidator.hasCorrectFileExtension('foo.ts.ts')).to.equal(false);
        expect(fileValidator.hasCorrectFileExtension('foo-baz.ts')).to.equal(false);
        expect(fileValidator.hasCorrectFileExtension('lorem-ipsum-dorem-sorem-oo-baz.ts')).to.equal(false);
    });

    it('should not validate file path with excluded file extension but it also includes valid file extensions', () => {
        includedFileExtensions = ['ts'];
        excludedFileExtensions = ['spec.ts'];
        initValidator();

        expect(fileValidator.hasCorrectFileExtension('foo.ts.spec.ts')).to.equal(false);
        expect(fileValidator.hasCorrectFileExtension('foo-baz.spec.ts')).to.equal(false);
        expect(fileValidator.hasCorrectFileExtension('lorem-ipsum-spec-ts-dorem-sorem-oo-baz.spec.ts')).to.equal(false);
    });

    function initValidator() {
        fileValidator = new FileExtensionValidator(includedFileExtensions, excludedFileExtensions);
    }

});