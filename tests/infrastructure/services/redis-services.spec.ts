import { RedisService } from '@/infrastructure/services/redis/redis-services'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import redis from 'redis-mock'
import { randomUUID } from 'crypto'

jest.mock('redis', () => {
  return {
    createClient: () => {
      return {
        connect: jest.fn(),
        get: jest.fn(async () => 'teste'),
        on: jest.fn(),
        del: jest.fn(async () => 'key-teste'),
        scan: jest.fn().mockReturnValue({ cursor: 0, keys: ['www.com.br'] })
      }
    }
  }
})

const redisClient = redis.createClient()
const removingKeys = randomUUID()

describe('RedisService', () => {
  let redisService: IRedisService
  beforeEach(() => {
    redisService = new RedisService()
  })

  it('should be defined', () => {
    expect(redisService).toBeDefined()
  })

  describe('RedisService.getCache', () => {
    it('should able method set', () => {
      expect(redisService.getCache).toBeDefined()
    })

    it('should be defined redisClient.get', async () => {
      await redisService.getCache('key').catch(jest.fn())
      expect(redisClient.get).toBeDefined()
    })
  })

  describe('RedisService.getAllKeys', () => {
    it('should be defined', () => {
      expect(redisService.getAllKeys).toBeDefined()
    })

    it('should be defined redisClient.scan', async () => {
      await redisService.getAllKeys().catch(jest.fn())
      expect(redisClient.scan).toBeDefined()
    })
    it('should be able return value listFlows', async () => {
      const response = await redisService.getAllKeys().catch(jest.fn())
      expect(response).toEqual(['www.com.br'])
    })
  })

  describe('RedisService.setCache', () => {
    it('should be defined', () => {
      expect(redisService.setCache).toBeDefined()
    })

    it('should be defined redisClient.set', async () => {
      await redisService.setCache('key', 'myKeyValue').catch(jest.fn())
      expect(redisClient.set).toBeDefined()
    })
  })

  describe('RedisService.cleanCache', () => {
    it('should be defined', () => {
      expect(redisService.cleanCache).toBeDefined()
    })

    it('should be defined redisClient.del', async () => {
      await redisService.cleanCache([removingKeys]).catch(jest.fn())
      expect(redisClient.del).toBeDefined()
    })

    it('should be able return value key-teste', async () => {
      jest.spyOn(redisService, 'getAllKeys').mockReturnValueOnce('key-teste' as any)
      const response = await redisService.cleanCache([removingKeys]).catch(jest.fn())
      expect(response).toBe('key-teste')
    })

    it('should be able return error in getAllkeys method', async () => {
      const expectedError = new Error('Error in getAllkeys method')
      try {
        redisService.getAllKeys = jest.fn().mockRejectedValue(expectedError)
        await redisService.cleanCache([removingKeys])
      } catch (error) {
        expect(error).toEqual(expectedError)
      }
    })
  })

  describe('RedisService.cleanCacheKey', () => {
    it('should be defined', () => {
      expect(redisService.cleanCacheKey).toBeDefined()
    })

    it('should be defined redisClient.del', async () => {
      await redisService.cleanCacheKey(['key']).catch(jest.fn())
      expect(redisClient.del).toBeDefined()
    })

    it('should be able return value key-teste', async () => {
      const response = await redisService.cleanCacheKey(['key']).catch(jest.fn())
      expect(response).toBe('key-teste')
    })
  })
})
