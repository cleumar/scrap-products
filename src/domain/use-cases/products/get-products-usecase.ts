import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { IWebScrapProductsServices, IRedisService } from '@/shared/interfaces'
import { IGetProductsParams } from '@/domain/interfaces/get-products-params-interface'
import { IGetProductsResponse } from '@/domain/interfaces/get-products-response-interface'

export class GetProductsUseCase
  implements IUseCase<IGetProductsParams, Promise<IGetProductsResponse>>
{
  constructor(
    private readonly audit: IAudit,
    private readonly redisService: IRedisService,
    private readonly webScrapProductsService: IWebScrapProductsServices
  ) {}

  async execute(paramUrlRequest: IGetProductsParams): Promise<any> {
    try {
      await this.audit.info('initializing.get-products-usecase.process')
      const url = paramUrlRequest.url
      const paramsCacheKey = `${url.toLowerCase()}`

      const cachedResponde = await this.redisService.getCache(paramsCacheKey)

      if (cachedResponde) {
        await this.audit.info(`there.is.cached.${url}`)
        return JSON.parse(cachedResponde)
      }

      const { statusCode, img, price, title, description } =
        await this.webScrapProductsService.getProducts(paramUrlRequest)

      await this.audit.info(`there.is.webScrap.${paramsCacheKey}`)

      if (statusCode === 200) {
        const groupsProductsResponse = { title, img, price, description, url }

        if (groupsProductsResponse) {
          await this.redisService.setCache(paramsCacheKey, [groupsProductsResponse])
        }
        return [groupsProductsResponse]
      } else {
        await this.audit.info(`No data found with these parameters: ${url}`)
        return {
          statusCode: 204
        }
      }
    } catch (error) {
      if (error.res) {
        await this.audit.error('error.return-message-products-usecase.process')
        await this.audit.error('', {
          message: error.message,
          error: error.res.data
        })
        return error.res
      }
    }
  }
}
