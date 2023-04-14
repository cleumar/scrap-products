import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IWebScrapProductsServices, IRedisService } from '@/shared/interfaces'
import { RedisService } from '@/infrastructure/services/redis/redis-services'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { AuditImpl } from '@/shared/audit/AuditImpl'
import { LoggerImp } from '@/shared/logger/implementations/LoggerImp'
import { ILogger } from '@/shared/interfaces/logger-interface'
import { GetItemProducts } from '@/infrastructure/services/scrap/get-products-services'
import { GetProductsController } from '@/presentation/controllers'
import { GetProductsUseCase } from '@/domain/use-cases/products/get-products-usecase'
import { IGetProductsParams } from '@/domain/interfaces/get-products-params-interface'

export const getProductsControllerFactory = (): GetProductsController => {
  const logger: ILogger = new LoggerImp()
  const audit: IAudit = new AuditImpl(logger)
  const redisService: IRedisService = new RedisService()
  const productsServices: IWebScrapProductsServices = new GetItemProducts()
  const getProductsUseCase: IUseCase<IGetProductsParams> = new GetProductsUseCase(
    audit,
    redisService,
    productsServices
  )

  return new GetProductsController(getProductsUseCase, audit)
}
