import express, { Express, Request, Response } from 'express'
import Joi from '@hapi/joi'
import fp from 'lodash/fp'
import bodyParser from 'body-parser'
import { globalStore } from '../base-service'

import MailgunClient, { SendResult } from './mailgun'

interface SendData {
  type: string
  from: string
  to: string | string[]
  subject: string
  content: string
}

export class Server {
  app: Express
  client: MailgunClient
  apiKey: string
  domain: string
  sendFunc: object

  constructor (apiKey: string, domain: string) {
    this.client = new MailgunClient(apiKey, domain)
    this.sendFunc = {
      html: this.client.sendHtml,
      text: this.client.sendText
    }
    this.initApp()
  }

  private initApp = () => {
    const app = express()

    app.all('*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
      next()
    })

    app.use(bodyParser.text())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    this.app = app
  }

  private send = async ({ type, from, to, subject, content }: SendData) => {
    const func = this.sendFunc[type] || this.client.sendText
    const res: SendResult = await func(from, to, subject, content)
    return res
  }

  private defaultRoute = (app: Express) => {
    app.post('/mail', async (req: Request, res: Response) => {
      const { type, from, to, subject, content } = req.body
      const { error } = Joi.validate(
        { type, from, to: fp.flatten([to]), subject, content },
        {
          type: Joi.string().lowercase().allow(['text', 'html']).required(),
          from: Joi.string().email().required(),
          to: Joi.array().length(1).unique()
            .items(Joi.string().email()).required(),
          subject: Joi.string().required(),
          content: Joi.string()
        }
      )
      if (error) throw error
      const sendResult = await this.send({ type, from, to, subject, content })
      res.json({ code: sendResult.code, message: sendResult.message })
    })
  }

  run (
    port: number,
    routers: ((app: Express) => void)[] = [this.defaultRoute]
  ) {
    const { serverService } = globalStore

    routers.forEach(func => func && func(this.app))

    serverService.run(this.app, port)
  }
}

export default Server
