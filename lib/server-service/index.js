"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const base_service_1 = require("../base-service");
const onError = (port) => (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            base_service_1.globalStore.puts(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            base_service_1.globalStore.puts(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const onListening = (server) => () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    base_service_1.globalStore.puts('Listening on ' + bind);
};
const useService = () => {
    base_service_1.register({ key: 'serverService', requirements: 'langExtService' });
    const run = (app, port) => {
        app.set('port', port);
        const server = http_1.default.createServer(app);
        server.listen(port);
        server.on('error', onError(port));
        server.on('listening', onListening(server));
    };
    base_service_1.globalStore.serverService = { run };
};
exports.default = useService;
//# sourceMappingURL=index.js.map