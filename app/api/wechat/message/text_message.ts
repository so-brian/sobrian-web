export interface TextMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: number;
    MsgType: string;
    Content: string;
    MsgId: number;
}