import axios from 'axios'
import qs from 'qs'

interface Response {
  statusCode: number
  body: string | null
  id: any
}

export interface SendResult {
  code: number,
  id: any,
  message: string
}

class Client {
  private apiKey: string
  private domain: string

  constructor (apiKey: string, domain: string) {
    this.apiKey = apiKey.replace(/^api\:/, '')
    this.domain = domain
  }

  auth = () => {
    return Buffer.from(`api:${this.apiKey}`).toString('base64')
  }

  requestWith = async (params: string) => {
    try {
      const res = await axios.post(
        `https://api.mailgun.net/v3/${this.domain}/messages`,
        params,
        { headers: { Authorization: `Basic ${this.auth()}` } }
      )
      return res.data
    } catch (err) {
      return {
        statusCode: 1,
        body: err.message
      }
    }
  }

  handle = (response: Response): SendResult => {
    if (response['status_code'] === 200) {
      const body = JSON.parse(response.body)
      return {
        code: 200,
        id: body.id,
        message: body.message
      }
    } else {
      return {
        code: 1,
        id: null,
        message: response.body
      }
    }
  }

  sendText = async (
    from: string,
    to: string | string[],
    subject: string,
    content: string
  ) => {
    const params = qs.stringify({ from, to, subject, text: content })
    const response = await this.requestWith(params)
    return this.handle(response)
  }

  sendHtml = async (
    from: string,
    to: string | string[],
    subject: string,
    content: string
  ) => {
    const params = qs.stringify({ from, to, subject, html: content })
    const response = await this.requestWith(params)
    return this.handle(response)
  }
}

export default Client
