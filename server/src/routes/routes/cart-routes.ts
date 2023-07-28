import express from 'express'

import getCart from '../../controllers/cart/get-cart'
import addToCart from '../../controllers/cart/add-to-cart'
import deleteFromCart from '../../controllers/cart/delete-from-cart'

const router = express.Router()

router.post('/add-to-cart', addToCart)
router.post('/delete-from-cart', deleteFromCart)
router.get('/', getCart)

export default router
