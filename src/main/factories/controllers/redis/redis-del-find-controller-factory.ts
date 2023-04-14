import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { RedisService } from '@/infrastructure/services/redis/redis-services'
import { RedisDelFindController } from '@/presentation/controllers'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { AuditImpl } from '@/shared/audit/AuditImpl'
import { LoggerImp } from '@/shared/logger/implementations/LoggerImp'
import { ILogger } from '@/shared/interfaces/logger-interface'
import { RedisDelFindUseCase } from '@/domain/use-cases'

export const redisDelFindControllerFactory = (): RedisDelFindController => {
  const redisService: IRedisService = new RedisService()
  const logger: ILogger = new LoggerImp()
  const audit: IAudit = new AuditImpl(logger)
  const redisDelFindUseCase: IUseCase<void> = new RedisDelFindUseCase(redisService, audit)

  return new RedisDelFindController(redisDelFindUseCase, audit)
}
