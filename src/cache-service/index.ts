import { Redis } from 'ioredis'
import { timeout as withTimeout, TimeoutError } from 'promise-timeout'
import { register, globalStore } from '../base-service'

const delCache = (redis: Redis) => (cacheKey: string) => redis.del(cacheKey)

const setCache = (redis: Redis) => (
  cacheKey: string, content: any, ttl: number = null
) => {
  if (ttl === null) ttl = 3600 * 6
  return redis.setex(cacheKey, ttl, JSON.stringify(content))
}

const getCache = (redis: Redis) => async (
  cacheKey: string, timeout: number = 200
) => {
  try {
    const result = await withTimeout(redis.get(cacheKey), timeout)
    return result ? JSON.parse(result) : null
  } catch (err) {
    if (!(err instanceof TimeoutError)) {
      globalStore.loggerService.error(`cache error: ${err.message}`)
    }
  }
  return null
}

const useService = () => {
  register({
    key: 'cacheService',
    requirements: ['redisService', 'loggerService']
  })

  const { redisService } = globalStore

  const set = setCache(redisService.redis)
  const get = getCache(redisService.redis)
  const del = delCache(redisService.redis)

  globalStore.cacheService = {
    set,
    get,
    del,
    setCache: set,
    getCache: get,
    delCache: del
  }
}

export default useService
