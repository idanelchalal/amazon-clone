import express from 'express'
import addAddress from '../../controllers/dashboard/add-address'
import getAddressList from '../../controllers/dashboard/get-address-list'

const router = express.Router()

router.post('/add-address', addAddress)
router.get('/get-address-list', getAddressList)

export default router
