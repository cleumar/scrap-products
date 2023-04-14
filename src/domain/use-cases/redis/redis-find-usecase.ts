import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { IAudit } from '@/shared/interfaces/audit-interface'

export class RedisFindUseCase implements IUseCase<any> {
  constructor(private readonly redisService: IRedisService, private readonly audit: IAudit) {}

  async execute(): Promise<any> {
    await this.audit.info('initializing.redis-find-list-usecase.process')
    try {
      const cachedAllResponde = await this.redisService.getAllKeys()

      return cachedAllResponde
    } catch (error) {
      await this.audit.error('error.redis-find-usecase.process', {
        message: error.message,
        stack: error.stack
      })
      throw error
    }
  }
}
