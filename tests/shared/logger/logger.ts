import logger from '@/shared/logger/winston/winston'

interface LoggerMessage {
  subject: string
  externalId?: string
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Logger {
  public static async info(message: string, obj?: LoggerMessage): Promise<void> {
    const msg = {
      ...obj,
      message
    }

    logger.log('info', JSON.stringify(msg))
  }

  public static async error(message: string, obj: LoggerMessage): Promise<void> {
    const msg = {
      ...obj,
      message
    }

    logger.log('error', JSON.stringify(msg))
  }
}
