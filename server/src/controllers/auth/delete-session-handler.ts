import { Request, Response } from 'express'

export default async function (req: Request, res: Response) {
    res.cookie('accessToken', '', { maxAge: 0, httpOnly: true })

    res.status(200).json({ success: true })
}
