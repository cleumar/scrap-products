import { RedisConnect } from '@/infrastructure/redis/redis-connect'
import { envs } from '@/config/constants'
import { IRedisService } from '@/shared/interfaces/redis-service-interface'
import { Logger } from '@/shared/logger/logger'

const redisClient: any = RedisConnect.getInstance()
redisClient.connect()

export class RedisService implements IRedisService {
  async getCache(key: string): Promise<any> {
    const result = await redisClient.get(key)
    return result
  }

  async getAllKeys(): Promise<string[] | []> {
    const response = await redisClient.scan(0, '*')
    return response.keys
  }

  async setCache(key: string, value: any): Promise<any> {
    try {
      return await redisClient.set(key, JSON.stringify(value), {
        EX: envs.redis.CACHE_EXPIRES_SECONDS
      })
    } catch (e) {
      await Logger.error('error.setCache', e)
      throw e
    }
  }

  async cleanCacheKey(key: string[]): Promise<number> {
    const response = await redisClient.del(key)
    return response
  }

  async cleanCache(removingKeys: string[]): Promise<number> {
    const response = await redisClient.del(removingKeys)
    return response
  }
}
