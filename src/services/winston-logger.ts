import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, splat, colorize } = format;

const myFormat = printf(({ level, message, timestamp: loggedTimestamp }) => {
  return `${loggedTimestamp} ${level}: ${message}`;
});
const logger = createLogger({
  format: combine(colorize(), splat(), timestamp(), myFormat),
  transports: [new transports.Console()],
});

const infoLogger = createLogger();

export { logger };
