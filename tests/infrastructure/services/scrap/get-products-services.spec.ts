import { GetItemProducts } from '@/infrastructure/services/scrap/get-products-services'

import axios from 'axios'

jest.mock('axios')

const fetchProducts = new GetItemProducts()
const data = {
  url: 'https://www.zattini.com.br/tamanco-vizzano-salto-medio-feminino-roxo-2DD-6563-198'
}

const products = {
  data: "<!doctype html><!--[if lt IE 7]> <html class=no-js mode-ie mode-ie6 lt-ie9 lt-ie8 lt-ie7 desktop product-page lang=pt-BR > <![endif]--><!--[if IE 7]>    <html class=no-js mode-ie mode-ie7 lt-ie9 lt-ie8 desktop product-page lang=pt-BR > <![endif]--><!--[if IE 8]>    <html class=no-js mode-ie mode-ie8 lt-ie9 desktop product-page lang=pt-BR > <![endif]--><!--[if IE 9]>    <html class=no-js mode-ie mode-ie9 desktop product-page lang=pt-BR > <![endif]--><!--[if gt IE 9]><!--> <html c…eName : null;} else if (pageName === 'institutional') {var isContact = verifyIsContact();pageName = isContact ? 'contact-us' : null;}if (details) {csdm('send', pageName, details);console.log('send', pageName, details);} else {if (pageName) {csdm('send', pageName);console.log('send', pageName);} else {csdm('send');console.log('send');}}} catch (err) {console.error('mapper-script.sendMapperData', err);}}window.freedom.nsPubSub.sub('pubsub.window.loaded', sendMapperData());</script></body></html>"
}

const productsReturnMap = {
  title: '',
  img: undefined,
  price: '',
  description: '',
  url: 'https://www.zattini.com.br/tamanco-vizzano-salto-medio-feminino-roxo-2DD-6563-198'
}

describe('fetchProducts', () => {
  describe('should return url dp successful', () => {
    it('should return products', async () => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce(products)

      const result = await fetchProducts.getProducts(data)
      expect(result).toEqual(productsReturnMap)
    })
  })
  describe('fetchProducts catch', () => {
    it('should return res value error', async () => {
      ;(axios.get as jest.Mock).mockRejectedValue({
        response: { status: 400, data: 'oi data' },
        message: 'oi'
      })
      const result = await fetchProducts.getProducts(data).catch(jest.fn())

      expect(result).toEqual(undefined)
    })
    it('should return empty', async () => {
      ;(axios.get as jest.Mock).mockRejectedValue({ response: undefined })

      const result = await fetchProducts.getProducts(data).catch(jest.fn())

      expect(result).toEqual(undefined)
    })
  })
})
