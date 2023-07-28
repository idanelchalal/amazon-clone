import { Request, Response } from 'express'
import Cart from '../../libs/Schemas/Cart'
import { getCartByUserId } from '../../utils/getCart'
import { isValidObjectId } from 'mongoose'
import AreObjectIdsEqual from '../../utils/AreObjectIdsEqual'

async function deleteFromCart(req: Request, res: Response) {
    const { productDto } = req.body
    const {
        //@ts-ignore
        user: { userId },
    } = req

    if (!userId) return res.status(403).json('INVALID_SESSION')

    const productId =
        isValidObjectId(productDto.productId) && productDto.productId

    if (!productId) return res.status(404).json('INVALID_PRODUCT_ID')

    try {
        const cart =
            (await getCartByUserId(userId)) ||
            (await new Cart({ userId }).save())

        const isProductInCart = cart.products.findIndex((prod) =>
            AreObjectIdsEqual(productId, prod.productId)
        )

        // If product is found in the cart => remove the quantity
        if (isProductInCart !== -1) {
            const isNegative =
                cart.products[isProductInCart].quantity - productDto.quantity <=
                0

            if (isNegative)
                cart.products = cart.products.filter(
                    (prod) => prod.productId?.toString() !== productId
                )
            else cart.products[isProductInCart].quantity -= productDto.quantity

            await cart.save()
            return res.status(201).json(cart)
        }
        // If product isn't in cart => cant remove a product which is not there.
        else return res.status(404).json('INVALID_OPERATION')
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default deleteFromCart
