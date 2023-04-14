import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { useCaseStub } from '@/tests/utils/stubs/use-case.stub'
import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { RedisDelFindController } from '@/presentation/controllers'

describe('Redis-Del-Find-UseCase', () => {
  let redisDelFindController
  let redisUseCase: IUseCase<any>
  let audit: IAudit
  beforeEach(() => {
    audit = auditStub()
    redisUseCase = useCaseStub()
    redisDelFindController = new RedisDelFindController(redisUseCase, audit)
  })

  it('should be defined', () => {
    expect(redisDelFindController).toBeDefined()
  })

  it('should be defined redisdelfindController.delFindRedis', () => {
    expect(redisDelFindController.delFindRedis).toBeDefined()
  })

  it('should throw error in method redis-del-find-UseCase.execute', async () => {
    const req = {}

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }

    const spy = jest
      .spyOn(redisUseCase, 'execute')
      .mockReturnValue({ info: 'keys deleted: listFlows' })

    await redisDelFindController.delFindRedis(req, mockResponse)

    expect(spy).toHaveBeenCalled()
  })

  it('should throw error in method redis-del-find-UseCase.execute', async () => {
    try {
      const req = {}

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      }

      const error = new Error('error.redis-del-find')
      jest.spyOn(redisUseCase, 'execute').mockRejectedValue(error)

      await redisDelFindController.delFindRedis(req, mockResponse)
    } catch (error) {
      const spyError = jest.spyOn(audit, 'error')
      expect(spyError).toHaveBeenCalled()
    }
  })
})
