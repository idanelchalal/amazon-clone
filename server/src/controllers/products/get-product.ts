import { Request, Response } from 'express'

import getSingleProduct from '../../utils/getSingleProduct'

const getProduct = async (req: Request, res: Response) => {
    const { params } = req
    const { productId } = params

    try {
        const prod = await getSingleProduct(productId)
        if (prod) return res.status(200).json(prod)
    } catch (error) {
        console.error(error)
        return res.status(404)
    }
    return res.status(404)
}
export default getProduct
