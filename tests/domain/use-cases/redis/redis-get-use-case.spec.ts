import { RedisGetUseCase } from '@/domain/use-cases'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { redisServiceStub } from '@/tests/utils/stubs/redis-service.stub'

describe('RedisGetUseCase', () => {
  let redisGetUseCase: IUseCase<any>
  let redisService: IRedisService
  let audit: IAudit

  beforeEach(() => {
    redisService = redisServiceStub()
    audit = auditStub()
    redisGetUseCase = new RedisGetUseCase(redisService, audit)
  })
  it('should be defined', () => {
    expect(redisGetUseCase).toBeDefined()
  })

  it('should be defined execute method', () => {
    expect(redisGetUseCase.execute).toBeDefined()
  })

  it('should be able to call method audit.info', async () => {
    const data = { key: ['listFlows'] }
    const spy = jest.spyOn(audit, 'info')
    jest
      .spyOn(redisService, 'getCache')
      .mockReturnValue('[{"displayName":"Lavoisier", "description":"","name":"id"}]' as any)
    await redisGetUseCase.execute(data.key)
    expect(spy).toHaveBeenCalled()
  })

  it('should be able to call method redisService.getCache', async () => {
    const data = { key: ['listFlows'] }
    const spy = jest
      .spyOn(redisService, 'getCache')
      .mockReturnValue('[{"displayName":"Lavoisier", "description":"","name":"id"}]' as any)
    await redisGetUseCase.execute(data.key)
    expect(spy).toHaveBeenCalled()
  })

  it('should be able to call method method audit.error', async () => {
    try {
      const data = { key: null }
      const error = new Error('Error in RedisGetUseCase ')
      jest.spyOn(redisService, 'getCache').mockRejectedValue(error)

      await redisGetUseCase.execute(data.key)
    } catch (error) {
      const spy = jest.spyOn(audit, 'error')
      expect(spy).toHaveBeenCalled()
    }
  })
})
