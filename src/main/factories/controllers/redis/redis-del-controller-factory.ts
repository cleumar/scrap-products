import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { RedisService } from '@/infrastructure/services/redis/redis-services'
import { RedisDelController } from '@/presentation/controllers'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { AuditImpl } from '@/shared/audit/AuditImpl'
import { LoggerImp } from '@/shared/logger/implementations/LoggerImp'
import { ILogger } from '@/shared/interfaces/logger-interface'
import { RedisDelUseCase } from '@/domain/use-cases'

export const redisDelControllerFactory = (): RedisDelController => {
  const redisService: IRedisService = new RedisService()
  const logger: ILogger = new LoggerImp()
  const audit: IAudit = new AuditImpl(logger)
  const redisDelUseCase: IUseCase<any> = new RedisDelUseCase(redisService, audit)

  return new RedisDelController(redisDelUseCase, audit)
}
