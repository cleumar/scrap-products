jest.mock('redis', () => {
  return {
    createClient: () => {
      return {
        connect: jest.fn(),
        get: jest.fn(async () => '[{"displayName":"Lavoisier", "description":"","name":"id"}]'),
        on: jest.fn(),
        del: jest.fn(async () => 'listFlows'),
        scan: jest.fn().mockReturnValue({ cursor: 0, keys: ['listFlows'] })
      }
    }
  }
})
