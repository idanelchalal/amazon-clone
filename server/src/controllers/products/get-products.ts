import { Request, Response } from 'express'

import getAllProducts from '../../utils/getAllProducts'

const getProducts = async (req: Request, res: Response) => {
    try {
        const prods = await getAllProducts()
        if (prods) return res.status(200).json(prods)
    } catch (error) {
        console.error(error)
        return res.status(404)
    }
    return res.status(404)
}
export default getProducts
