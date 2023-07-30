import { env } from "process";
import { WXMsgCrypto, sha1 } from "./utility";
import { log } from "console";
import { Parser } from "xml2js";
import { TextMessage, ResponseMessage, EncryptedMessage, EncryptedResponseMessage } from "./message";
import { SobrianOpenaiServiceClientImpl } from "../../sobrian-openai-service";
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
    const params = new URL(request.url).searchParams;
    const signature = params.get('signature');
    const timestamp = params.get('timestamp');
    const nonce = params.get('nonce');
    const echostr = params.get('echostr');
    const token = env.WECHAT_TOKEN;

    // verify token
    const str = [token, timestamp, nonce].sort().join('');
    if (sha1(str) === signature) {
        return new Response(echostr, { status: 200 })
    }

    return new Response('Invalid signature', { status: 403 })
}

export async function POST(request: Request) {
    const body = await request.text()
    const params = new URL(request.url).searchParams;
    const signature = params.get('signature');
    const timestamp = params.get('timestamp');
    const nonce = params.get('nonce');
    const encrypt_type = params.get('encrypt_type');
    const msg_signature = params.get('msg_signature');

    if (encrypt_type !== 'aes') {
        return new Response('success', { status: 403 })
    }

    var parser = new Parser({ explicitArray: false });
    const message = (await parser.parseStringPromise(body)).xml as EncryptedMessage;


    const wXMsgCrypto = new WXMsgCrypto(process.env.WECHAT_TOKEN!, process.env.WECHAT_ENCODING_AES_KEY!, process.env.WECHAT_APPID!);
    var signatureFromBody = wXMsgCrypto.getSignature(timestamp!, nonce!, message.Encrypt);
    log(signatureFromBody);

    const plainText = wXMsgCrypto.decrypt(message.Encrypt);
    log(plainText);

    const decriptedMessage = (await parser.parseStringPromise(plainText.message)).xml as TextMessage;

    const content = decriptedMessage.Content;

    try {
        const responseContent = await new SobrianOpenaiServiceClientImpl(uuidv4()).chat(content);
        const responseMessage = new ResponseMessage(decriptedMessage.FromUserName, decriptedMessage.ToUserName, 'text', responseContent);
        const responseMessageXML = responseMessage.toXML();

        const timestampResp = Math.ceil(Date.now() / 1000);
        const nonceResp = Math.random().toString().slice(-9);
        const encryptedContent = wXMsgCrypto.encrypt(responseMessageXML);

        const signatureResp = wXMsgCrypto.getSignature(timestampResp!.toString(), nonceResp, encryptedContent);

        const encryptedResponseMessage = new EncryptedResponseMessage(encryptedContent, signatureResp, timestampResp, nonceResp);
        const xml = encryptedResponseMessage.toXML();

        return new Response(xml, { status: 200 });
    } catch (error) {
        return new Response('Invalid response', { status: 500 })
    }
}