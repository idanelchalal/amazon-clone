// Generic routing file for purposes of organizing all end points.
import express from 'express'
const router = express.Router()

import ProductsRoutes from './routes/products-routes'
import AuthRoutes from './routes/auth-routes'
import CartRoutes from './routes/cart-routes'

// Importing all specific routes.
router.use('/api/products', ProductsRoutes)
router.use('/api/auth', AuthRoutes)
router.use('/api/cart', CartRoutes)

export default router
