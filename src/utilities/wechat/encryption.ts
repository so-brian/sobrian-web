// encryption.js
import crypto from 'crypto'

export class WechatUtility {
    public static md5 = (str: string) => {
        return crypto.createHash('md5').update(str).digest('hex')
    }

    public static sha1 = (str: string) => {
        return crypto.createHash('sha1').update(str).digest('hex')
    }
}