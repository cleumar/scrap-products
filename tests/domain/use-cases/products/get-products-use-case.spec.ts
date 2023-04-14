import { IWebScrapProductsServices, IRedisService } from '@/shared/interfaces'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { webScrapProductsServiceStub } from '@/tests/utils/stubs/products.stub'
import { redisServiceStub } from '@/tests/utils/stubs/redis-service.stub'
import { GetProductsUseCase } from '@/domain/use-cases'

const data = { url: 'https://www.com.br' }

describe('GetExamsVaccinesUseCase', () => {
  let audit: IAudit
  let redisService: IRedisService
  let webScrapProductsService: IWebScrapProductsServices
  let getProductsUseCase

  beforeEach(() => {
    jest.clearAllMocks()
    audit = auditStub()
    redisService = redisServiceStub()
    webScrapProductsService = webScrapProductsServiceStub()
    getProductsUseCase = new GetProductsUseCase(audit, redisService, webScrapProductsService)
  })
  describe('GetProductsUseCase', () => {
    jest.clearAllMocks()
    describe('GetProductsUseCase success', () => {
      it('should be defined', () => {
        expect(getProductsUseCase).toBeDefined()
      })

      it('should be able to call getCache success', async () => {
        const spy = jest.spyOn(redisService, 'getCache')
        await getProductsUseCase.execute(data)

        expect(spy).toHaveBeenCalled()
      })

      it('should be able to call getCache return null', async () => {
        const data = {
          title: '',
          img: undefined,
          price: '',
          description: '',
          url: 'www.com.br'
        }

        const spy = jest.spyOn(redisService, 'getCache').mockResolvedValue(null)
        await getProductsUseCase.execute(data)

        expect(spy).toHaveBeenCalled()
      })

      it('should be able to call getCache undefined', async () => {
        const spy = jest.spyOn(redisService, 'getCache').mockReturnValue(null)

        const spy2 = jest.spyOn(webScrapProductsService, 'getProducts')

        await getProductsUseCase.execute(data)
        expect(spy).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalled()
      })
    })
    describe('GetExamsVaccinesUseCase fail', () => {
      it('should be able to call method webScrapProductsService return status 204', async () => {
        const spy = jest.spyOn(redisService, 'getCache').mockReturnValue(null)

        const spy2 = jest
          .spyOn(webScrapProductsService, 'getProducts')
          .mockReturnValue({ status: 204 } as any)

        await getProductsUseCase.execute(data)
        expect(spy).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalled()
      })

      it('should be able to call method webScrapProductsService return status 400', async () => {
        const spy = jest.spyOn(redisService, 'getCache').mockReturnValue(null)

        const spy2 = jest
          .spyOn(webScrapProductsService, 'getProducts')
          .mockRejectedValue({ res: { status: 400 } })

        await getProductsUseCase.execute(data)
        expect(spy).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalled()
      })

      it('should be able to call method webScrapProductsService return status undefined', async () => {
        const spy = jest.spyOn(redisService, 'getCache').mockReturnValue(null)

        const spy2 = jest
          .spyOn(webScrapProductsService, 'getProducts')
          .mockRejectedValue({ res: undefined })

        await getProductsUseCase.execute(data)
        expect(spy).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalled()
      })
    })
  })
})
