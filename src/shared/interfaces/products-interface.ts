import { IGetProductsParams } from '@/domain/interfaces/get-products-params-interface'

export interface IWebScrapProductsServices {
  getProducts: (data: IGetProductsParams) => Promise<any>
}
