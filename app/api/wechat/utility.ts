import * as crypto from 'crypto'

export function md5(str: string) {
    return crypto.createHash('md5').update(str).digest('hex')
}

export function sha1(str: string) {
    return crypto.createHash('sha1').update(str).digest('hex')
}