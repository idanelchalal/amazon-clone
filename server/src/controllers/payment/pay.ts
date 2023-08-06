import { Request, Response } from 'express'

const pay = (req: Request, res: Response) => {
    console.log(req.body)
}

export default pay
