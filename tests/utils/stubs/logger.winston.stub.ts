const stub = Object.freeze({
  log: jest.fn()
})

export const loggerWintonStub = () => stub as any
