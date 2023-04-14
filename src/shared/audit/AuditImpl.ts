import { IAudit } from '@/shared/interfaces/audit-interface'
import { ILogger } from '@/shared/interfaces/logger-interface'

export class AuditImpl implements IAudit {
  constructor(private readonly logger: ILogger) {}

  async info(comment: string, complement?: any): Promise<void> {
    if (complement) {
      await this.logger.info(comment, complement)
    } else {
      await this.logger.info(comment)
    }
  }

  async error(comment: string, complement?: any): Promise<void> {
    if (complement) {
      await this.logger.error(comment, complement)
    } else {
      await this.logger.error(comment)
    }
  }
}
