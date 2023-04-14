import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { IAudit } from '@/shared/interfaces/audit-interface'

export class RedisDelUseCase implements IUseCase<any> {
  constructor(private readonly redisService: IRedisService, private readonly audit: IAudit) {}

  async execute(key: string): Promise<any> {
    await this.audit.info('initializing.redis-del-usecase.process')
    try {
      const cachedAllResponde = await this.redisService.cleanCacheKey([key])

      await this.audit.info('return.del.cache.redis-usecase.process')

      if (cachedAllResponde === 0) {
        return {
          error: `Not found records: ${key}`
        }
      } else {
        return { info: `keys deleted: ${key}` }
      }
    } catch (error) {
      await this.audit.error('error.redis-del-usecase.process', {
        message: error.message,
        stack: error.stack
      })
      throw error
    }
  }
}
