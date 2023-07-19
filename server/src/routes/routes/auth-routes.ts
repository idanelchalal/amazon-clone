import express from 'express'

import createSessionHandler from '../../controllers/auth/create-session-handler'
import createUser from '../../controllers/auth/create-user'
import getSessionHandler from '../../controllers/auth/get-session-handler'
import deleteSessionHandler from '../../controllers/auth/delete-session-handler'
import requireUser from '../../middleware/require-user'

const router = express.Router()

router.post('/auth/session', createSessionHandler)

router.delete('/auth/session', requireUser, deleteSessionHandler)

router.get('/auth/session', requireUser, getSessionHandler)

router.post('/auth/signup', createUser)

export default router
