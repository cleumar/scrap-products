import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { RedisService } from '@/infrastructure/services/redis/redis-services'
import { RedisFindController } from '@/presentation/controllers/redis/redis-find-controller'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { AuditImpl } from '@/shared/audit/AuditImpl'
import { LoggerImp } from '@/shared/logger/implementations/LoggerImp'
import { ILogger } from '@/shared/interfaces/logger-interface'
import { RedisFindUseCase } from '@/domain/use-cases/redis/redis-find-usecase'

export const redisFindControllerFactory = (): RedisFindController => {
  const redisService: IRedisService = new RedisService()
  const logger: ILogger = new LoggerImp()
  const audit: IAudit = new AuditImpl(logger)
  const redisFindUseCase: IUseCase<void> = new RedisFindUseCase(redisService, audit)

  return new RedisFindController(redisFindUseCase, audit)
}
