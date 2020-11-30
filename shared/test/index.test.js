const chai = require('chai');
const { expect } = require('chai');

chai.use(require('chai-fs'));

const logger = require('../src/index')
const logfilePath = 'debug.log';

describe ('TEST PACKAGE', () => {
    it ('Have to create a log file', () => {
        logger.initLog();
        expect(logfilePath).to.be.a.file()
    })

    it ('Have to write a line with a string', () => {
        const string = 'My test string';
        const re = new RegExp(string, "g");
        logger.writeLog(string);
        expect(logfilePath).to.be.a.file().with.contents.that.match(re);
    })
})