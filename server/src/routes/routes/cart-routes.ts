import express from 'express'

import getCart from '../../controllers/cart/get-cart'
import addToCart from '../../controllers/cart/add-to-cart'

const router = express.Router()

router.get('/cart', getCart)
router.post('/add-to-cart', addToCart)

export default router
