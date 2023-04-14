import { RedisConnect } from '@/infrastructure/redis/redis-connect'
import { createClient } from 'redis'

jest.mock('redis', () => ({
  createClient: jest.fn().mockReturnValue({
    on: jest.fn().mockImplementation(function (_, handler) {
      if (handler) {
        handler()
      }
      return this
    }),
    connect: jest.fn()
  })
}))

describe('RedisConnect', () => {
  it('should be defined', () => {
    expect(RedisConnect).toBeDefined()
  })

  describe('RedisConnect.getInstance', () => {
    it('should be defined', () => {
      expect(RedisConnect.getInstance).toBeDefined()
    })

    it('should be defined call getInstance', () => {
      RedisConnect.getInstance()

      expect(createClient).toHaveBeenCalled()
    })
  })
})
