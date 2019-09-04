import useBaseService, { globalStore } from './base-service'
import useConfigService from './config-service'
import useLangExtService from './lang-ext-service'
import useLoggerService from './logger-service'
import useRedisService from './redis-service'
import useCacheService from './cache-service'
import useServerService from './server-service'
import useMailService from './mail-service'

export default {
  globalStore,
  useBaseService,
  useConfigService,
  useLangExtService,
  useLoggerService,
  useRedisService,
  useCacheService,
  useServerService,
  useMailService
}
