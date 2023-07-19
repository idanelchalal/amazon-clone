import { NextFunction, Request, Response } from 'express'

export default async function requireUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    //@ts-ignore
    if (!req.user) return res.status(403).json('INVALID_SESSION')

    return next()
}
