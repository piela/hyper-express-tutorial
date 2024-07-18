import { createLogger, format, transports } from 'winston';

const logFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({ filename:'logs/error.log', level: 'error' }),
    new transports.File({ filename:  'logs/combined.log'}),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat

    
      )
    })
  ],
  exceptionHandlers: [
   
    new transports.File({ filename: 'logs/exceptions.log'})
  ]
});

export default logger;
