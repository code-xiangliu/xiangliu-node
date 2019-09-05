import { Response } from 'express'
import changeCaseObj from 'change-case-object'

import pwdHash from './pwd-hash'

const sendJSON = (res: Response, camelObj: any) => {
  const useCamel = res.req.headers['x-use-camel']
  if (useCamel === 'true') {
    res.json(camelObj)
  } else {
    const snakeObj = changeCaseObj.snakeCase(camelObj)
    res.json(snakeObj)
  }
}

export default {
  sendJSON,
  pwdHash
}
