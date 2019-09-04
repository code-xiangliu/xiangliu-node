interface Response {
    statusCode: number;
    body: string | null;
    id: any;
}
export interface SendResult {
    code: number;
    id: any;
    message: string;
}
declare class Client {
    private apiKey;
    private domain;
    constructor(apiKey: string, domain: string);
    auth: () => string;
    requestWith: (params: string) => Promise<any>;
    handle: (response: Response) => SendResult;
    sendText: (from: string, to: string | string[], subject: string, content: string) => Promise<SendResult>;
    sendHtml: (from: string, to: string | string[], subject: string, content: string) => Promise<SendResult>;
}
export default Client;
