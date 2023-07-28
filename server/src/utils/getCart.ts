import { isValidObjectId } from 'mongoose'
import Cart from '../libs/Schemas/Cart'

export async function getCartByUserId(userId: string) {
    const validId = isValidObjectId(userId)

    const cart = validId && (await Cart.findOne({ userId }))
    if (!cart) return null

    return cart
}

export async function getCartById(cartId: string) {
    const validId = isValidObjectId(cartId)

    const cart = validId && (await Cart.findById(cartId))
    if (!cart) return null

    return cart
}
