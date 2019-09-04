import { Express } from 'express';
import MailgunClient from './mailgun';
export declare class Server {
    app: Express;
    client: MailgunClient;
    apiKey: string;
    domain: string;
    sendFunc: object;
    constructor(apiKey: string, domain: string);
    private initApp;
    private send;
    private defaultRoute;
    run(port: number, routers?: ((app: Express) => void)[]): void;
}
export default Server;
