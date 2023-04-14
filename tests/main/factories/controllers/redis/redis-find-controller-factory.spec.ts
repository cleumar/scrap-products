import { redisFindControllerFactory } from '@/main/factories/controllers'
import { RedisFindController } from '@/presentation/controllers'

describe('redisFindControllerFactory', () => {
  it('should be defined', () => {
    expect(RedisFindController).toBeDefined()
  })

  it('should be instance of RedisFindController', () => {
    expect(redisFindControllerFactory()).toBeInstanceOf(RedisFindController)
  })
})
