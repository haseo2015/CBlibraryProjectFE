const fs = require('fs');
const util = require('util');

const logDate = new Date().toISOString();
const logName = 'debug.log';
let log_file

const logger = {
  initLog: () => {
    log_file = fs.createWriteStream(__dirname + `/${logName}`, {flags : 'w'});
  },
  writeLog: info => {    
    try{
      if (fs.existsSync(__dirname + `/${logName}`)) {
        log_file.write(util.format(`${logDate} - ${info}`) + '\n');
      } else {
        logger.initLog()
        log_file.write(util.format(`${logDate} - ${info}`) + '\n');
      }
      
    } catch(err) {
      console.error(err)
    }
  }

}




module.exports = logger