import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),

    // This tells winston how to handle Error objects properly
    format.errors({ stack: true }),

    // Allows logger.error('msg %s', value)
    format.splat(),

    // Ensure error details don't get swallowed when nested
    format((info) => {
      if (info.error instanceof Error) {
        info.error = {
          name: info.error.name,
          message: info.error.message,
          stack: info.error.stack,
        };
      }
      return info;
    })(),

    format.json()
  ),
  transports: [
    new transports.Console(),
  ],
});

export default logger;
