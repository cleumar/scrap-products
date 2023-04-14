import request from 'supertest'
import app from '@/config/app'

describe('should Get Endpoints', () => {
  it('should success 400 getredis', async () => {
    const res = await request(app).get('/redis/')
    expect(res.status).toEqual(400)
  })

  it('should success 200 get redis', async () => {
    const res = await request(app).get('/redis/?key=teste')
    expect(res.status).toEqual(200)
  })

  it('should success 200 find', async () => {
    const res = await request(app).get('/redis/all')
    expect(res.status).toEqual(200)
  })

  it('should error 400 delete', async () => {
    const res = await request(app).delete('/redis/')
    expect(res.status).toEqual(400)
  })

  it('should success 200 delredis', async () => {
    const res = await request(app).delete('/redis/?key=teste')
    expect(res.status).toEqual(200)
  })

  it('should success 200 delete all', async () => {
    const res = await request(app).delete('/redis/all')
    expect(res.status).toEqual(200)
  })
})
