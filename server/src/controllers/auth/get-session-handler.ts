import { Request, Response } from 'express'

export default async function getSessionHandler(req: Request, res: Response) {
    //@ts-ignore
    res.json(req.user)
}
