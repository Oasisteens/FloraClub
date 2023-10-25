import * as Table from 'cli-table';
import * as colors from "colors/safe";
import {config, ExcludedFileExtensions, IncludedFileExtensions} from "../config";
import {BasicTableFormatter} from "./table-formatters/basic-table-formatter";
import {TypeScriptFileCrawlerFactory} from "./crawlers/type-script-file-crawler-factory";
import {FileExtensionValidator} from "./validators/file-extension-validator";
import {FileSystemCrawler} from "./crawlers/file-system-crawler";
import {FileDeterminer} from "./determiners/file-determiner";
import {DirectoryCrawler} from "./crawlers/directory-crawler";

const crawlingPath = process.argv[2] || config.DEFAULT_PATH;
const includedFileExtensions: IncludedFileExtensions = config.DEFAULT_FILE_INCLUDED_EXTENSIONS;
const excludedFileExtensions: ExcludedFileExtensions = config.DEFAULT_FILE_EXCLUDED_EXTENSIONS;

const tableFormatter = new BasicTableFormatter(colors as any);
const fileCrawlerFactory = new TypeScriptFileCrawlerFactory(Table, tableFormatter);

startJourney();

function startJourney() {
    const fileExtensionValidator = new FileExtensionValidator(includedFileExtensions, excludedFileExtensions);
    const fileSystemCrawler = new FileSystemCrawler(
        crawlingPath, fileCrawlerFactory, fileExtensionValidator, new FileDeterminer(), new DirectoryCrawler()
    );

    fileSystemCrawler.start();
}

