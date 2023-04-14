import { IRedisDelFind } from '@/shared/interfaces/redis-del-find-interface'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { IUseCase } from '@/shared/interfaces/use-case.interface'

export class RedisDelFindController {
  constructor(private readonly redisUseCase: IUseCase<void>, private readonly audit: IAudit) {}

  async delFindRedis(_req, res): Promise<any> {
    try {
      await this.audit.info('initializing.redis-del-find-controller.process')
      const responseData: IRedisDelFind = await this.redisUseCase.execute()
      res.json(responseData)
    } catch (error) {
      await this.audit.error('error.redis-del-find-usecase.process', {
        message: error.message,
        stack: error.stack
      })
      throw error
    }
  }
}
