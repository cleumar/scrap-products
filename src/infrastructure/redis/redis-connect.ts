import { createClient } from 'redis'
import { Logger } from '@/shared/logger/logger'
import { envs } from '@/config/constants'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RedisConnect {
  public static instance: any

  public static getInstance() {
    if (!RedisConnect.instance) {
      const client = createClient({
        password: envs.redis.REDIS_PASSWORD,
        socket: {
          port: parseInt(envs.redis.REDIS_PORT),
          host: envs.redis.REDIS_HOST
        }
      })
      client.on('ready', async () => await Logger.info('✅ 💃 connect redis success !'))
      client.on('error', async err => await Logger.error('Redis Client Error', err))
      RedisConnect.instance = client
    }
    return RedisConnect.instance
  }
}
