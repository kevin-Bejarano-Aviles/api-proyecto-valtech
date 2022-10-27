const { createLogger, format, transports } = require('winston');

const loggerFormat = format.printf(({
  level, message, timestamp, stack,
}) => `[${timestamp}] ${level}: ${stack || message}`);
const logger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        loggerFormat,
      ),
    }),
    new transports.File({
      filename: `${__dirname}/../utils/log-api.log`,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        loggerFormat,
      ),
    }),
  ],
});

module.exports = logger;
