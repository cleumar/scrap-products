import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { useCaseStub } from '@/tests/utils/stubs/use-case.stub'

import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { RedisGetController } from '@/presentation/controllers'

describe('Redis-Get-UseCase', () => {
  let redisGetController
  let redisUseCase: IUseCase<any>
  let audit: IAudit
  beforeEach(() => {
    audit = auditStub()
    redisUseCase = useCaseStub()
    redisGetController = new RedisGetController(redisUseCase, audit)
  })

  it('should be defined', () => {
    expect(redisGetController).toBeDefined()
  })

  it('should be defined redisGetController.getRedis', () => {
    expect(redisGetController.getRedis).toBeDefined()
  })

  it('should throw success in method redis-get-UseCase.execute', async () => {
    const req = { query: { key: '123' } }

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn()
    }

    const spy = jest.spyOn(redisUseCase, 'execute')

    await redisGetController.getRedis(req, mockResponse)
    expect(spy).toHaveBeenCalled()
  })

  it('should throw error in method redis-get-UseCase.execute', async () => {
    const req = { query: { key: null } }

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn()
    }

    const spy = jest.spyOn(redisUseCase, 'execute')

    await redisGetController.getRedis(req, mockResponse).catch(jest.fn())
    expect(spy).toHaveBeenCalled()
  })
})
