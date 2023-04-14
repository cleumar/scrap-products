import { ILogger } from '@/shared/interfaces/logger-interface'
import { AuditImpl } from '@/shared/audit/AuditImpl'
import { IAudit } from '@/shared/interfaces/audit-interface'
import { loggerStub } from '@/tests/utils/stubs/logger.stub'

describe('Audit Implementation', () => {
  let audit: IAudit
  let logger: ILogger
  beforeEach(() => {
    logger = loggerStub()
    audit = new AuditImpl(logger)
  })

  it('should be defined', () => {
    expect(audit).toBeDefined()
  })

  describe('Audit.info', () => {
    it('should be defined', () => {
      expect(audit.info).toBeDefined()
    })

    it('should method logger.info must be called', async () => {
      const spy = jest.spyOn(logger, 'info')

      await audit.info('some message here', 'teste')

      expect(spy).toHaveBeenCalled()
    })

    it('should method logger.info must be called', async () => {
      const spy = jest.spyOn(logger, 'info')

      await audit.info('teste')

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('Audit.error', () => {
    it('should be defined', () => {
      expect(audit.error).toBeDefined()
    })

    it('should method logger.error must be called', async () => {
      const spy = jest.spyOn(logger, 'error')
      await audit.error('teste')
      expect(spy).toHaveBeenCalled()
    })

    it('should method logger.error must be called complement', async () => {
      const spy = jest.spyOn(logger, 'error')
      await audit.error('teste', 'teste-complemnte')
      expect(spy).toHaveBeenCalled()
    })
  })
})
