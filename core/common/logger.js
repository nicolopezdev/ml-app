const winston = require('winston');
const { format } = winston;
const { combine, colorize, prettyPrint, timestamp, printf } = format;

// set _default_ log level based on env name
let defaultLogLevel = 'silly';
const logLevel = process.env[ 'LOG_LEVEL' ] || defaultLogLevel;

function customLogMessage(info) {
  const { timestamp, level, message, ...rest } = info;
  const baseMessage = `${timestamp} ${level}: ${message}`;
  return Object.keys(rest).length <= 0 ? baseMessage : `${baseMessage} ${JSON.stringify(rest)}`;
}

// Default logger
let loggerConfig = {
  transports: [
    new winston.transports.Console({
      level: logLevel,
      handleExceptions: true,
      format: combine(colorize(), prettyPrint(), timestamp(), printf(customLogMessage)),
    }),
  ],
};

let logger = winston.createLogger(loggerConfig);

module.exports = logger;
