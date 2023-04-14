import { redisGetControllerFactory } from '@/main/factories/controllers'
import { RedisGetController } from '@/presentation/controllers'

describe('redisGetControllerFactory', () => {
  it('should be defined', () => {
    expect(RedisGetController).toBeDefined()
  })

  it('should be instance of RedisDelController', () => {
    expect(redisGetControllerFactory()).toBeInstanceOf(RedisGetController)
  })
})
