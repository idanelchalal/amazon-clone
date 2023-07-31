import { Request, Response } from 'express'
import { getCartByUserId } from '../../utils/getCart'
import Cart from '../../libs/Schemas/Cart'

async function getCart(req: Request, res: Response) {
    const {
        //@ts-ignore
        user: { userId },
    } = req

    if (!userId) return res.status(403).json('INVALID_SESSION')

    try {
        const cart =
            (await getCartByUserId(userId).then((cart) =>
                cart?.populate('products.productId')
            )) || (await new Cart({ userId }).save())

        // If something goes wrong
        if (!cart) return res.status(500).json('SERVER_ERROR')

        return res.status(200).json(cart)
    } catch (err) {
        console.error(err)
        return res.json(err)
    }
}

export default getCart
