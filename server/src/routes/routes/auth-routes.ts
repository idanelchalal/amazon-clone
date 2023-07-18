import express from 'express'

import createSessionHandler from '../../controllers/auth/create-session-handler'
import createUser from '../../controllers/auth/create-user'

const router = express.Router()

router.post('/auth/signin', createSessionHandler)
router.post('/auth/signup', createUser)

export default router
