import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    trace: 4,
    debug: 5
  },
  level: process.env.LOG_LEVEL,
  format: format.json(),
  transports: [new transports.Console()]
})

export default logger
