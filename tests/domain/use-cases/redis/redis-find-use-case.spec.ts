import { RedisFindUseCase } from '@/domain/use-cases'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { redisServiceStub } from '@/tests/utils/stubs/redis-service.stub'

describe('RedisFindUseCase', () => {
  let redisFindUseCase: IUseCase<any>
  let redisService: IRedisService
  let audit: IAudit

  beforeEach(() => {
    redisService = redisServiceStub()
    audit = auditStub()
    redisFindUseCase = new RedisFindUseCase(redisService, audit)
  })
  it('should be defined', () => {
    expect(redisFindUseCase).toBeDefined()
  })

  it('should be defined execute method', () => {
    expect(redisFindUseCase.execute).toBeDefined()
  })

  it('should be able to call method audit.info', async () => {
    const spy = jest.spyOn(audit, 'info')
    await redisFindUseCase.execute()
    expect(spy).toHaveBeenCalled()
  })

  it('should be able to call method audit.info', async () => {
    jest.spyOn(audit, 'info')
    const spy = jest.spyOn(redisService, 'getAllKeys')
    await redisFindUseCase.execute()
    expect(spy).toHaveBeenCalled()
  })

  it('should be able to call method method audit.error', async () => {
    try {
      const error = new Error('Error in RedisFindUseCase ')
      jest.spyOn(redisService, 'getAllKeys').mockRejectedValue(error)

      await redisFindUseCase.execute()
    } catch (error) {
      const spy = jest.spyOn(audit, 'error')
      expect(spy).toHaveBeenCalled()
    }
  })
})
