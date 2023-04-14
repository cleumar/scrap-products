
import express from 'express'
import {
  applyRoutesRedis,
  applyRoutesProducts
} from '@/main/routes'
import { Logger } from '@/shared/logger/logger'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  res.status(200).send('Hello scrap_backend')
  await Logger.info('🚀 hello world ', {
    subject: 'hello-world'
  })
})

app.get('/health', async (req, res) => {
  res.status(200).send('scrap_backend is up')
  await Logger.info('🚀 health-check ', {
    subject: 'health-check'
  })
})

applyRoutesRedis(app)
applyRoutesProducts(app)

export default app
