import { RedisDelFindUseCase } from '@/domain/use-cases'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { redisServiceStub } from '@/tests/utils/stubs/redis-service.stub'

describe('RedisDelFindUseCase', () => {
  let redisDelFindUseCase: IUseCase<any>
  let redisService: IRedisService
  let audit: IAudit

  beforeEach(() => {
    redisService = redisServiceStub()
    audit = auditStub()
    redisDelFindUseCase = new RedisDelFindUseCase(redisService, audit)
  })
  it('should be defined', () => {
    expect(redisDelFindUseCase).toBeDefined()
  })

  it('should be defined execute method', () => {
    expect(redisDelFindUseCase.execute).toBeDefined()
  })

  it('should be able to call method audit.info', async () => {
    const spy = jest.spyOn(audit, 'info')
    jest.spyOn(redisService, 'getAllKeys').mockReturnValue([] as any)
    await redisDelFindUseCase.execute()
    expect(spy).toHaveBeenCalled()
  })

  it('should be able to call method redisService.cleanCache', async () => {
    jest.spyOn(audit, 'info')
    jest.spyOn(redisService, 'getAllKeys').mockReturnValue(['www.com.br'] as any)
    const spy = jest.spyOn(redisService, 'cleanCache')
    await redisDelFindUseCase.execute()
    expect(spy).toHaveBeenCalled()
  })

  it('should be able to call method redisDelFindUseCase.execute with error', async () => {
    jest.spyOn(audit, 'info')
    jest.spyOn(redisService, 'getAllKeys').mockReturnValue([] as any)

    expect(await redisDelFindUseCase.execute()).toStrictEqual('Not found records: redis/all')
  })

  it('should be able to call method method audit.error', async () => {
    try {
      const error = new Error('Error in RedisDelUseCase ')
      jest.spyOn(redisService, 'getAllKeys').mockRejectedValue(error)

      await redisDelFindUseCase.execute()
    } catch (error) {
      const spy = jest.spyOn(audit, 'error')
      expect(spy).toHaveBeenCalled()
    }
  })
})
