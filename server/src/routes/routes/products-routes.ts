import express from 'express'
import getProduct from '../../controllers/products/get-product'
import getProducts from '../../controllers/products/get-products'

const router = express.Router()

router.get('/getAllProducts', getProducts)
router.get('/:productId', getProduct)

export default router
