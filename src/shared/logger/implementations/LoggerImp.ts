import { ILogger } from '@/shared/interfaces/logger-interface'
import logger from '../winston/winston'

export class LoggerImp implements ILogger {
  async info(message: string, complement?: any): Promise<void> {
    await this.generateMessage('info', message, complement)
  }

  async error(message: string, complement?: any): Promise<void> {
    await this.generateMessage('error', message, complement)
  }

  async debug(message: string, complement?: any): Promise<void> {
    await this.generateMessage('debug', message, complement)
  }

  async warn(message: string, complement?: any): Promise<void> {
    await this.generateMessage('warn', message, complement)
  }

  public async generateMessage(type: string, message: string, complement?: any): Promise<void> {
    const msg = {
      content: {
        message,
        ...complement
      }
    }
    logger.log(type, msg)
  }
}
