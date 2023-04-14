import { ILogger } from '@/shared/interfaces/logger-interface'

const stub = Object.freeze({
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn()
})

export const loggerStub = () => stub as ILogger
