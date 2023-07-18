import jwt from 'jsonwebtoken'
import { Config } from '../../config'

export function signJwt(payload: Object, expiresIn: string | number) {
    return jwt.sign(payload, Config.JWT_PRIVATE_KEY!, {
        expiresIn,
        algorithm: 'RS256',
    })
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, Config.JWT_PUBLIC_KEY!)
        return { payload: decoded, expired: false }
    } catch (error: any) {
        return {
            payload: null,
            expired: error.message.include('jwt expired'),
        }
    }
}
