import request from 'supertest'
import app from '@/config/app'

describe('should Get Endpoints', () => {
  it('should success 200 products', async () => {
    const res = await request(app)
      .get('/products/')
      .query({
        url: 'https://www.zattini.com.br/tamanco-vizzano-salto-medio-feminino-roxo-2DD-6563-198'
      })
    expect(res.status).toEqual(200)
  })

  it('should error 400 products', async () => {
    const res = await request(app).get('/products/')
    expect(res.status).toEqual(400)
  })
})
