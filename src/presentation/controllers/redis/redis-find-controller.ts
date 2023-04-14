import { IAudit } from '@/shared/interfaces/audit-interface'
import { IUseCase } from '@/shared/interfaces/use-case.interface'

export class RedisFindController {
  constructor(private readonly redisUseCase: IUseCase<void>, private readonly audit: IAudit) {}

  async getAllRedis(_req, res): Promise<void> {
    try {
      await this.audit.info('initializing.redis-find-controller.process')
      const responseData = await this.redisUseCase.execute()
      res.json(responseData)
    } catch (error) {
      await this.audit.error('error.redis-find-usecase.process', {
        message: error.message,
        stack: error.stack
      })
      throw error
    }
  }
}
