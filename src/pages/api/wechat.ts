// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { WechatUtility } from '../../utilities'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let echostr = req.query['echostr']
    let signature = req.query['signature']
    let timestamp = req.query['timestamp']
    let nonce = req.query['nonce']
    let token = "SoBrian"

    // 验证token
    let str = [token, timestamp, nonce].sort().join('')
    let sha1 = WechatUtility.sha1(str)
    if (sha1 !== signature) {
        res.json("error")
        return
    } else {
        res.end(echostr)
    }
}
