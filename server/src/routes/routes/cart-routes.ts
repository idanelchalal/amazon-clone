import express from 'express'

import getCart from '../../controllers/cart/get-cart'
import addToCart from '../../controllers/cart/add-to-cart'
import deleteFromCart from '../../controllers/cart/delete-from-cart'
import deleteFromCartByQty from '../../controllers/cart/delete-from-cart-by-qty'
import setCart from '../../controllers/cart/set-cart'

const router = express.Router()

router.post('/add-to-cart', addToCart)
router.post('/delete-from-cart-by-qty', deleteFromCartByQty)
router.post('/delete-from-cart', deleteFromCart)
router.put('/set-cart', setCart)
router.get('/', getCart)

export default router
