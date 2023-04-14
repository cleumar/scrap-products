import { IUseCase } from '@/shared/interfaces/use-case.interface'
import { useCaseStub } from '@/tests/utils/stubs/use-case.stub'

import { auditStub } from '@/tests/utils/stubs/audit.stub'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { RedisFindController } from '@/presentation/controllers'

describe('Redis-Del-Find-UseCase', () => {
  let redisFindController
  let redisUseCase: IUseCase<any>
  let audit: IAudit
  beforeEach(() => {
    audit = auditStub()
    redisUseCase = useCaseStub()
    redisFindController = new RedisFindController(redisUseCase, audit)
  })

  it('should be defined', () => {
    expect(redisFindController).toBeDefined()
  })

  it('should be defined redisfindController.getAllRedis', () => {
    expect(redisFindController.getAllRedis).toBeDefined()
  })

  it('should throw error in method redis-find-UseCase.execute', async () => {
    const error = new Error('error')
    const spy = jest.spyOn(redisUseCase, 'execute').mockRejectedValue(error)

    await redisFindController.getAllRedis().catch(jest.fn())
    expect(spy).toHaveBeenCalled()
  })
})
