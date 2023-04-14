import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { IRedisDelFind } from '@/shared/interfaces/redis-del-find-interface'

export class RedisDelFindUseCase implements IUseCase<any> {
  constructor(private readonly redisService: IRedisService, private readonly audit: IAudit) {}

  async execute(): Promise<IRedisDelFind | string> {
    await this.audit.info('initializing.redis-find-usecase.process')
    try {
      let removingKeys = []
      removingKeys = await this.redisService.getAllKeys()

      await this.audit.info('return.get.removingKeys.process')
      if (removingKeys.length === 0) {
        return 'Not found records: redis/all'
      }

      await this.audit.info('return.removingKeys.process')
      await this.redisService.cleanCache(removingKeys)
      return { info: `keys deleted: ${removingKeys}` }
    } catch (error) {
      await this.audit.error('error.redis-del-find-usecase.process', {
        message: error.message,
        stack: error.stack
      })
      throw error
    }
  }
}
