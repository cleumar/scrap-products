import { ILogger } from '@/shared/interfaces/logger-interface'
import { LoggerImp } from '@/shared/logger/implementations/LoggerImp'

describe('Logger Implementation', () => {
  let logger: ILogger

  beforeEach(() => {
    logger = new LoggerImp()
  })

  it('should be defined', () => {
    expect(logger).toBeDefined()
  })

  describe('logger.debug', () => {
    it('should be defined', () => {
      expect(logger.debug).toBeDefined()
    })

    it('should method logger.debug must be called', async () => {
      const spy = jest.spyOn(logger, 'generateMessage' as any)

      await logger.debug('some message here')

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('logger.warn', () => {
    it('should be defined', () => {
      expect(logger.warn).toBeDefined()
    })

    it('should method logger.warn must be called', async () => {
      const spy = jest.spyOn(logger, 'generateMessage' as any)

      await logger.warn('some message here')

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('logger.error', () => {
    it('should be defined', () => {
      expect(logger.error).toBeDefined()
    })

    it('should method logger.error must be called', async () => {
      const spy = jest.spyOn(logger, 'generateMessage' as any)

      await logger.error('some message here')

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('logger.info', () => {
    it('should be defined', () => {
      expect(logger.info).toBeDefined()
    })

    it('should method logger.info must be called', async () => {
      const spy = jest.spyOn(logger, 'generateMessage' as any)

      await logger.info('some message here')

      expect(spy).toHaveBeenCalled()
    })
  })
})
