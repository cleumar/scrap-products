import { Express, Request, Response, Router } from 'express'
import {
  redisFindControllerFactory,
  redisGetControllerFactory,
  redisDelControllerFactory,
  redisDelFindControllerFactory
} from '@/main/factories/controllers'

export const apiRouter = Router()

apiRouter.delete('/redis', async (_req: Request, res: Response) => {
  return redisDelControllerFactory().delRedis(_req, res)
})

apiRouter.delete('/redis/all', async (_req: Request, res: Response) => {
  return redisDelFindControllerFactory().delFindRedis(_req, res)
})

apiRouter.get('/redis', async (_req: Request, res: Response) => {
  return redisGetControllerFactory().getRedis(_req, res)
})

apiRouter.get('/redis/all', async (_req: Request, res: Response) => {
  return redisFindControllerFactory().getAllRedis(_req, res)
})

export const applyRoutesRedis = (app: Express): void => {
  app.use('/', apiRouter)
}
