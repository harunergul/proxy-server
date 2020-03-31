var winston = require('winston');
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '40m',
  maxFiles: '60d',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json())
});



transport.on('rotate', function(oldFilename, newFilename) {
  console.log("On rotation...")
});

var logger = winston.createLogger({
  transports: [
    transport
  ]
});

logger.info('Hello World!');