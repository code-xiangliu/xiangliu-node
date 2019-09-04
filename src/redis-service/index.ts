import Redis from 'ioredis'

import { register, globalStore } from '../base-service'

export interface RedisOptions {
  port: number
  host: string
  options: any
}

const useService = (options: RedisOptions = null) => {
  register({ key: 'redisService', requirements: 'configService' })

  const config = options || globalStore.configService.config.redisService
  const redis = new Redis(config)
  globalStore.redisService = { redis, options }
}

export default useService
