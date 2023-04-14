import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { RedisService } from '@/infrastructure/services/redis/redis-services'
import { RedisGetController } from '@/presentation/controllers/redis/redis-get-controller'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { AuditImpl } from '@/shared/audit/AuditImpl'
import { LoggerImp } from '@/shared/logger/implementations/LoggerImp'
import { ILogger } from '@/shared/interfaces/logger-interface'
import { RedisGetUseCase } from '@/domain/use-cases/redis/redis-get-usecase'

export const redisGetControllerFactory = (): RedisGetController => {
  const redisService: IRedisService = new RedisService()
  const logger: ILogger = new LoggerImp()
  const audit: IAudit = new AuditImpl(logger)
  const redisGetUseCase: IUseCase<any> = new RedisGetUseCase(redisService, audit)

  return new RedisGetController(redisGetUseCase, audit)
}
