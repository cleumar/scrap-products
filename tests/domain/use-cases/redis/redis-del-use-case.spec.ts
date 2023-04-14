import { RedisDelUseCase } from '@/domain/use-cases'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { redisServiceStub } from '@/tests/utils/stubs/redis-service.stub'

describe('RedisDelUseCase', () => {
  let redisDelUseCase: IUseCase<any>
  let redisService: IRedisService
  let audit: IAudit

  beforeEach(() => {
    redisService = redisServiceStub()
    audit = auditStub()
    redisDelUseCase = new RedisDelUseCase(redisService, audit)
  })
  it('should be defined', () => {
    expect(redisDelUseCase).toBeDefined()
  })

  it('should be defined execute method', () => {
    expect(redisDelUseCase.execute).toBeDefined()
  })

  it('should be able to call method audit.info', async () => {
    const spy = jest.spyOn(audit, 'info')
    await redisDelUseCase.execute('listFlows')
    expect(spy).toHaveBeenCalled()
  })

  it('should be able to call method audit.info', async () => {
    jest.spyOn(audit, 'info')
    const spy = jest.spyOn(redisService, 'cleanCacheKey')
    await redisDelUseCase.execute('listFlows')
    expect(spy).toHaveBeenCalled()
  })

  it('should be able to call method redisDelUseCase.execute with return error', async () => {
    jest.spyOn(audit, 'info')
    jest.spyOn(redisService, 'cleanCacheKey').mockReturnValue(0 as any)

    expect(await redisDelUseCase.execute('listFlows')).toStrictEqual({
      error: 'Not found records: listFlows'
    })
  })

  it('should be able to call method method audit.error', async () => {
    try {
      const error = new Error('Error in RedisDelUseCase ')
      jest.spyOn(redisService, 'cleanCacheKey').mockRejectedValue(error)

      await redisDelUseCase.execute('listFlows')
    } catch (error) {
      const spy = jest.spyOn(audit, 'error')
      expect(spy).toHaveBeenCalled()
    }
  })
})
