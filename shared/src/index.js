const fs = require('fs');
const util = require('util');

const logDate = new Date().toISOString();
const logName = 'debug.log';
let log_file

exports.initLog = initLog;
exports.writeLog = writeLog;

function initLog () {
  log_file = fs.createWriteStream(`./${logName}`, {flags : 'w'});
};

function writeLog (info) { 
  if (fs.existsSync(`./${logName}`)) {
    log_file.write(util.format(`${logDate} - ${info}`) + '\n');
  } else {
    logger.initLog()
    log_file.write(util.format(`${logDate} - ${info}`) + '\n');
  }
}
