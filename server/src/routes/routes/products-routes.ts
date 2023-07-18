import express from 'express'
import getProduct from '../../controllers/products/get-product'
import getProducts from '../../controllers/products/get-products'

const router = express.Router()

router.get('/products/getAllProducts/', getProducts)
router.get('/products/:productId', getProduct)

export default router
