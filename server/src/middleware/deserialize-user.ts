import { NextFunction, Request, Response } from 'express'
import { signJwt, verifyJwt } from '../libs/jwt/jwt.util'
import { getSession } from '../utils/session.utils'

export default async function deserializeUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { accessToken, refreshToken } = req.cookies

    if (!accessToken && !refreshToken) return next()

    const { payload, expired } = verifyJwt(accessToken)

    const verifiedRefresh = verifyJwt(refreshToken)?.payload

    // If Refresh Token isn't verified
    if (!verifiedRefresh) return next()

    // If session doesn't even exists in our db.
    //@ts-ignore
    const session = await getSession(verifiedRefresh?.sessionId)
    if (!session) return next()

    // If the access token is valid and updated.
    if (payload && !expired) {
        //@ts-ignore
        req.user = payload
        return next()
    }

    // If the access token is expired
    //@ts-ignore

    const newAccessToken = signJwt(
        session,
        // 5 Minutes
        '30000s'
    )

    // Cookie expires in 5 Minutes
    res.cookie('accessToken', newAccessToken, {
        // 5 Minutes
        maxAge: 300000,
        httpOnly: true,
    })

    //@ts-ignore
    req.user = verifyJwt(newAccessToken).payload

    return next()
}
