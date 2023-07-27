import express from 'express'

import createSessionHandler from '../../controllers/auth/create-session-handler'
import createUser from '../../controllers/auth/create-user'
import getSessionHandler from '../../controllers/auth/get-session-handler'
import deleteSessionHandler from '../../controllers/auth/delete-session-handler'
import requireUser from '../../middleware/require-user'

const router = express.Router()

router.post('/session', createSessionHandler)

router.delete('/session', requireUser, deleteSessionHandler)

router.get('/session', requireUser, getSessionHandler)

router.post('/signup', createUser)

export default router
