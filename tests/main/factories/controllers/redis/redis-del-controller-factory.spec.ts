import { redisDelControllerFactory } from '@/main/factories/controllers'
import { RedisDelController } from '@/presentation/controllers'

describe('redisDelControllerFactory', () => {
  it('should be defined', () => {
    expect(RedisDelController).toBeDefined()
  })

  it('should be instance of RedisDelController', () => {
    expect(redisDelControllerFactory()).toBeInstanceOf(RedisDelController)
  })
})
