import { Logger } from '@/shared/logger/logger'
import logger from '@/shared/logger/winston/winston'

jest.mock('@/shared/logger/winston/winston', () => {
  return {
    log: jest.fn()
  }
})

describe('logger', () => {
  it('should be defined', () => {
    expect(Logger).toBeDefined()
  })

  describe('logger.info', () => {
    it('should be defined', () => {
      expect(Logger.info).toBeDefined()
    })

    it('should method logger.info must be called', async () => {
      await Logger.info('some message here', {} as any)

      expect(logger.log).toHaveBeenCalled()
    })
  })

  describe('logger.error', () => {
    it('should be defined', () => {
      expect(Logger.error).toBeDefined()
    })

    it('should method logger.error must be called', async () => {
      await Logger.error('some message here', {} as any)

      expect(logger.log).toHaveBeenCalled()
    })
  })
})
