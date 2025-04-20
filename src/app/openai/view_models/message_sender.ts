export class MessageSender {
    id: string;
    name: string;
    avatarUrl: string;

    constructor(id: string, name: string, avatarUrl: string) {
        this.id = id;
        this.name = name;
        this.avatarUrl = avatarUrl;
    }
}