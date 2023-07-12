import express from 'express'
import getProduct from '../../controllers/getProduct'
import getProducts from '../../controllers/getProducts'

const router = express.Router()
router.get('/products/getAllProducts/', getProducts)
router.get('/products/:productId', getProduct)

export default router
