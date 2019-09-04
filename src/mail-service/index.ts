
import { register, globalStore } from '../base-service'
import MailgunClient from './mailgun'
import Server from './server'

const useService = () => {
  register({ key: 'mailService', requirements: 'serverService' })

  globalStore.mailServer = { MailgunClient, Server }
}

export default useService
