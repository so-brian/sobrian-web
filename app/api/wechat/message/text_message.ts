import { time } from "console";

export interface TextMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: number;
    MsgType: string;
    Content: string;
    MsgId: number;
}

export interface EncryptedMessage {
    ToUserName: string;
    Encrypt: string;
}

export class ResponseMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: number;
    MsgType: string;
    Content: string;

    /**
     *
     */
    constructor(toUserName: string, fromUserName: string, msgType: string, content: string) {
        this.ToUserName = toUserName;
        this.FromUserName = fromUserName;
        var d1 = new Date();
        var d2 = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
        this.CreateTime = Math.floor(d2.getTime() / 1000);
        this.MsgType = msgType;
        this.Content = content;
    }

    public toXML(): string {
        return "<xml>" + "<ToUserName><![CDATA[" + this.ToUserName + "]]></ToUserName>" + "<FromUserName><![CDATA[" + this.FromUserName + "]]></FromUserName>" + "<CreateTime>" + this.CreateTime + "</CreateTime>" + "<MsgType><![CDATA[" + this.MsgType + "]]></MsgType>" + "<Content><![CDATA[" + this.Content + "]]></Content>" + "</xml>";
    }
}

export class EncryptedResponseMessage {
    Encrypt: string;
    MsgSignature: string;
    Timestamp: number;
    Nonce: string;

    constructor(encrypt: string, msgSignature: string, timestamp: number, nonce: string) {
        this.Encrypt = encrypt;
        this.MsgSignature = msgSignature;
        this.Timestamp = timestamp;
        this.Nonce = nonce;
    }

    public toXML(): string {
        const xml = `<xml>
            <Encrypt><![CDATA[${this.Encrypt}]]></Encrypt>
            <MsgSignature>${this.MsgSignature}</MsgSignature>
            <TimeStamp>${this.Timestamp}</TimeStamp>
            <Nonce>${this.Nonce}</Nonce>
        </xml>`;

        return xml;
    }
}