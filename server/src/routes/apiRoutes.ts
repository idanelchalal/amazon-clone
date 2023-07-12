// Generic routing file for purposes of organizing all end points.
import express from 'express'
const router = express.Router()

import productsRoutes from './routes/productsRoutes'

// Importing all specific routes.
router.use('/api', productsRoutes)

export default router
