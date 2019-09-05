import useBaseService, { globalStore } from './base-service'
import useConfigService from './config-service'
import useLangExtService from './lang-ext-service'
import useLoggerService from './logger-service'
import useRedisService from './redis-service'
import useCacheService from './cache-service'
import useServerService from './server-service'
import useMailService from './mail-service'
import utils from './utils'

export default {
  utils,
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
