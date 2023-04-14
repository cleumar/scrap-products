import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { IAudit } from '@/shared/interfaces/audit-interface'

export class RedisGetUseCase implements IUseCase<any> {
  constructor(private readonly redisService: IRedisService, private readonly audit: IAudit) {}

  async execute(key: string): Promise<any> {
    await this.audit.info('initializing.redis-get-usecase.process')
    try {
      const cachedAllResponde = await this.redisService.getCache(key)
      await this.audit.info('return.get.cache.redis-get-usecase.process')
      return JSON.parse(cachedAllResponde)
    } catch (error) {
      await this.audit.error('error.redis-get-usecase.process', {
        message: error.message,
        stack: error.stack
      })
      throw error
    }
  }
}
