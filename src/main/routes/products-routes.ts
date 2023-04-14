import { Express, Request, Response, Router } from 'express'
import { getProductsControllerFactory } from '@/main/factories/controllers'
import { validateProductsRequest } from '@/shared/utils/validate/schemaValidate'
import { IGetProductsParams } from '@/domain/interfaces/get-products-params-interface'

export const apiRouter = Router()

apiRouter.get('/products/', async (req: Request, res: Response) => {
  try {
    const data: IGetProductsParams = {
      url: req.query.url as string
    }

    await validateProductsRequest.validateAsync(data)

    return getProductsControllerFactory().getProducts(data, res)
  } catch (error) {
    res.status(400).json({ error: error.details[0] })
  }
})

export const applyRoutesProducts = (app: Express): void => {
  app.use('/', apiRouter)
}
