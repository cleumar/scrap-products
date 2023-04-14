import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { useCaseStub } from '@/tests/utils/stubs/use-case.stub'

import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { RedisDelController } from '@/presentation/controllers'

describe('Redis-Del-Find-UseCase', () => {
  let redisDelController
  let redisUseCase: IUseCase<any>
  let audit: IAudit
  beforeEach(() => {
    audit = auditStub()
    redisUseCase = useCaseStub()
    redisDelController = new RedisDelController(redisUseCase, audit)
  })

  it('should be defined', () => {
    expect(redisDelController).toBeDefined()
  })

  it('should be defined redisdelController.delRedis', () => {
    expect(redisDelController.delRedis).toBeDefined()
  })

  it('should success in method redis-del-UseCase.execute', async () => {
    const req = { query: { key: '123' } }

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }

    const spy = await jest.spyOn(redisUseCase, 'execute')

    await redisDelController.delRedis(req, mockResponse).catch(jest.fn())
    expect(spy).toHaveBeenCalled()
  })

  it('should throw error in method redis-dell-UseCase.execute', async () => {
    const req = { query: { key: null } }

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn()
    }

    const spy = jest.spyOn(redisUseCase, 'execute')

    await redisDelController.delRedis(req, mockResponse).catch(jest.fn())
    expect(spy).toHaveBeenCalled()
  })
})
