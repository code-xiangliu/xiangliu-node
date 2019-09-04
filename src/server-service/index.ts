import http, { Server } from 'http'
import { Express } from 'express'

import { register, globalStore } from '../base-service'

const onError = (port: any) => (error: any) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      globalStore.puts(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      globalStore.puts(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

const onListening = (server: Server) => () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  globalStore.puts('Listening on ' + bind)
}

const useService = () => {
  register({ key: 'serverService', requirements: 'langExtService' })

  const run = (app: Express, port: number) => {
    app.set('port', port)
    const server = http.createServer(app)

    server.listen(port)
    server.on('error', onError(port))
    server.on('listening', onListening(server))
  }

  globalStore.serverService = { run }
}

export default useService
