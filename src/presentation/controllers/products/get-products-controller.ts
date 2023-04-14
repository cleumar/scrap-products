import { IAudit } from '@/shared/interfaces/audit-interface'
import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { IGetProductsParams } from '@/domain/interfaces/get-products-params-interface'
export class GetProductsController {
  constructor(
    private readonly getProductsUseCase: IUseCase<IGetProductsParams>,
    private readonly audit: IAudit
  ) {}

  async getProducts(data: IGetProductsParams, res: any): Promise<any> {
    await this.audit.info('initializing.get.products-controller.process')
    try {
      const resultProducts = await this.getProductsUseCase.execute(data)

      if (!resultProducts) {
        return resultProducts
      }

      res.send(resultProducts)
    } catch (error) {
      await this.audit.error('error.get.products-controller.process', {
        message: error
      })
      throw error
    }
  }
}
