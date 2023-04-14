import { GetProductsController } from '@/presentation/controllers'
import { getProductsControllerFactory } from '@/main/factories/controllers'

describe('GetProductsController', () => {
  it('should be defined', () => {
    expect(GetProductsController).toBeDefined()
  })

  it('should be instance of GetProductsController', () => {
    expect(getProductsControllerFactory()).toBeInstanceOf(GetProductsController)
  })
})
