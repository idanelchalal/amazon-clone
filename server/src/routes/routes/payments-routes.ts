import express from 'express'
import pay from '../../controllers/payment/pay'

const router = express.Router()

router.post('/pay', pay)

export default router
