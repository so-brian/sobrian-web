export interface SobrianOpenaiServiceClient {
    chat: (content: string) => Promise<string>;
}

interface ChatDto {
    data: string;
    message: string;
}

export class SobrianOpenaiServiceClientImpl implements SobrianOpenaiServiceClient {
    constructor(private readonly sessionId: string) { }

    async chat(content: string): Promise<string> {
        const body = JSON.stringify({
            'message': content,
        });
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        };
        const url = `https://apim.sobrian.net/openai/openai/chat/${this.sessionId}`;
        const response = await fetch(url, requestOptions);

        if (response.status !== 201) {
            throw new Error('Invalid response');
        }

        const json = await response.json() as ChatDto;

        return json.data;
    }
}
