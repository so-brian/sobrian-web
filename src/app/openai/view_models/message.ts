import { MessageSender } from "./message_sender";
import { Position } from "./position";

export class Message {
    dialogId: string;
    private sender: MessageSender;
    text: string;
    createdAt: Date;
    avatarUrl: string;

    constructor(dialogId: string, sender: MessageSender, text: string, createdAt: Date) {
        this.dialogId = dialogId;
        this.sender = sender;
        this.text = text;
        this.createdAt = createdAt;
        this.avatarUrl = sender.avatarUrl;
    }

    getPosition (): Position {
        if (this.sender.id === "user") {
            return Position.END;
        }

        return Position.START;
    }
}