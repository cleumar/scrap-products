import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { useCaseStub } from '@/tests/utils/stubs/use-case.stub'
import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { GetProductsController } from '@/presentation/controllers'

describe('GetPriceController', () => {
  let getProductsController
  let getProductsUseCase: IUseCase<any>
  let audit: IAudit

  beforeEach(() => {
    jest.clearAllMocks()
    audit = auditStub()
    getProductsUseCase = useCaseStub()
    getProductsController = new GetProductsController(getProductsUseCase, audit)
  })
  it('should be defined', () => {
    expect(getProductsUseCase).toBeDefined()
  })

  it('should be defined GetProductsController.getProducts', () => {
    expect(getProductsController.getProducts).toBeDefined()
  })

  it('should be defined GetProductsController.execute', async () => {
    const spy = jest.spyOn(getProductsUseCase, 'execute')
    await getProductsController.getProducts(null, 'products')
    expect(spy).toHaveBeenCalled()
  })

  it('should throw error in method GetProductsController.execute', async () => {
    const error = new Error('error')
    const spy = jest.spyOn(getProductsUseCase, 'execute').mockRejectedValue(error)

    await getProductsController.getProducts(null, '').catch(jest.fn())
    expect(spy).toHaveBeenCalled()
  })
})
