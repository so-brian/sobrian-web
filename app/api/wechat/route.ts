import { env } from "process";
import { sha1 } from "./utility";
import { log } from "console";
import { Parser } from "xml2js";
import { TextMessage } from "./message";

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
    log(body);

    var parser = new Parser({ explicitArray: false });
    // display the whole result, otherwise the function stops after depth=2
    // console.log(util.inspect(result, false, null))
    // console.dir(result);
    // console.log('Done');
    const message = (await parser.parseStringPromise(body)).xml as TextMessage;
    const content = message.Content;

    const response = await fetch('http://4.236.216.222/v1/chat', {
        method: 'POST',
        // headers: {
        //     'Accept': 'application/vnd.github.v3+json',
        // },
        body: JSON.stringify({
            "content": content,
        })
    });

    if (response.status !== 200) {
        return new Response('Invalid response', { status: 500 })
    }

    const chatDto = await response.json();

    const xml = "<xml>" + "<ToUserName><![CDATA[aas]]></ToUserName>" + "<FromUserName><![CDATA[Brian-7]]></FromUserName>" + "<CreateTime>1689745494</CreateTime>" + "<MsgType><![CDATA[text]]></MsgType>" + "<Content><![CDATA[" + chatDto.data.content + "]]></Content>" + "</xml>";
    // <xml>
    //   <ToUserName><![CDATA[toUser]]></ToUserName>
    //   <FromUserName><![CDATA[fromUser]]></FromUserName>
    //   <CreateTime>12345678</CreateTime>
    //   <MsgType><![CDATA[text]]></MsgType>
    //   <Content><![CDATA[你好]]></Content>
    // </xml>

    return new Response(xml, { status: 200 });
}