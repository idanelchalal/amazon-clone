import { Request, Response } from 'express'

import Cart from '../../libs/Schemas/Cart'

import { getCartByUserId } from '../../utils/getCart'

import { isValidObjectId } from 'mongoose'

import AreObjectIdsEqual from '../../utils/AreObjectIdsEqual'

async function addToCart(req: Request, res: Response) {
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

        const isProductExistsAlready = cart.products.findIndex((prod) =>
            AreObjectIdsEqual(productId, prod.productId)
        )

        // If product is found in the cart already => only add the quantity
        if (isProductExistsAlready !== -1) {
            cart.products[isProductExistsAlready].quantity +=
                productDto.quantity

            await cart.save()

            return res.status(201).json(cart)
        }

        // Otherwise add the product as is

        cart.products.push({
            productId,
            quantity: productDto.quantity,
        })

        await cart.save()

        return res.status(201).json(cart)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default addToCart
