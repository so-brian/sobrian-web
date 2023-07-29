import { Message } from ".";

export interface Dialogue {
    messages: Message[];
    sessionId: string;
}