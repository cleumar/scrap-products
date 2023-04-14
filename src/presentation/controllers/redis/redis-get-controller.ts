import { IAudit } from '@/shared/interfaces/audit-interface'
import { IUseCase } from '@/shared/interfaces/use-case.interface'

export class RedisGetController {
  constructor(private readonly redisUseCase: IUseCase<void>, private readonly audit: IAudit) {}

  async getRedis(req, res): Promise<void> {
    try {
      if (!req.query.key) {
        res
          .status(400)
          .json({ error: 'Please, send key name throw params. e.g.: redis/?key=keyName' })
      } else {
        await this.audit.info('initializing.redis-get-controller.process')
        const responseGetKey = await this.redisUseCase.execute(req.query.key)
        res.json(responseGetKey)
      }
    } catch (error) {
      await this.audit.error('error.redis-get-usecase.process', {
        message: error.message,
        stack: error.stack
      })
      throw error
    }
  }
}
