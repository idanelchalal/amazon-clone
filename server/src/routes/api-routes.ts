// Generic routing file for purposes of organizing all end points.
import express from 'express'
const router = express.Router()

import ProductsRoutes from './routes/products-routes'
import AuthRoutes from './routes/auth-routes'

// Importing all specific routes.
router.use('/api', ProductsRoutes)
router.use('/api', AuthRoutes)

export default router
