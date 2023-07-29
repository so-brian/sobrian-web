export interface SobrianOpenaiServiceClient {
    chat: (content: string) => Promise<string>;
}

interface ChatDtoData {
    content: string;
    sessionId: string;
}

interface ChatDto {
    data: ChatDtoData;
    message: string;
}

export class SobrianOpenaiServiceClientImpl implements SobrianOpenaiServiceClient {
    constructor(private readonly sessionId: string) { }

    async chat(content: string): Promise<string> {
        const body = JSON.stringify({
            'sessionId': this.sessionId,
            'content': content,
        });
        console.log(body);
        const response = await fetch('https://apim.sobrian.net/openai/v1/chat', {
            method: 'POST',
            body: body
        });

        if (response.status !== 200) {
            throw new Error('Invalid response');
        }

        const json = await response.json() as ChatDto;


        return json.data.content;
    }
}
