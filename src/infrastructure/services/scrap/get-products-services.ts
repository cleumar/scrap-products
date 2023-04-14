import { IWebScrapProductsServices } from '@/shared/interfaces'
import { envs } from '@/config/constants'
import axios from 'axios'
import cheerio from 'cheerio'
import { IGetProductsResponse } from '@/domain/interfaces/get-products-response-interface'
import { IGetProductsParams } from '@/domain/interfaces/get-products-params-interface'

const params = {
  axiosTimeout: envs.AXIOS_TIMEOUT
}

export class GetItemProducts implements IWebScrapProductsServices {
  async getProducts(paramUrlRequest: IGetProductsParams): Promise<IGetProductsResponse> {
    try {
      const url = paramUrlRequest.url
      const response = await axios.get(`${url}`, { timeout: Number(`${params.axiosTimeout}`) })
      const $ = cheerio.load(response.data)
      const statusCode = response.status
      const img = $('.photo-figure > .zoom').prop('src')
      const price = $('.default-price > span > strong').text()
      const title = $('.short-description > h1').text()
      const description = $('p[itemprop=description]').text()

      return { statusCode, img, price, title, description, url }
    } catch (error) {
      if (error.response) {
        const res = {
          status: error.response.status,
          data: error.response.statusText
        }
        throw { message: error.message, res } as any
      }
      throw { message: error.message } as any
    }
  }
}
