import { redisDelFindControllerFactory } from '@/main/factories/controllers'
import { RedisDelFindController } from '@/presentation/controllers'

describe('redisDelFindControllerFactory', () => {
  it('should be defined', () => {
    expect(RedisDelFindController).toBeDefined()
  })

  it('should be instance of RedisDelFindController', () => {
    expect(redisDelFindControllerFactory()).toBeInstanceOf(RedisDelFindController)
  })
})
