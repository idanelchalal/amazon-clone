import { Request, Response } from 'express'
import { getUserByEmail } from '../../utils/getUser'

import { signJwt, verifyJwt } from '../../libs/jwt/jwt.util'
import { bcryptCompare } from '../../libs/bcrypt/bcrypt.utils'
import { createSession } from '../../utils/session.utils'

export default async function createSessionHandler(
    req: Request,
    res: Response
) {
    const { email, password } = req.body

    // Ensuring existence of the client's email.
    const user = await getUserByEmail(email)
    if (!user) return res.status(401).json('The email does not exist.')

    // Comparing the client's password to the password found in the database

    const isCorrectPassword = await bcryptCompare(
        password,
        user.password as string
    )

    if (!isCorrectPassword)
        return res.status(401).json('Password is incorrect.')

    const session = await createSession(email)

    // Creating an access token
    const accessToken = signJwt(
        {
            email: user.email,
            name: user.name,
            username: user.username,
            birthdate: user.birthdate,
        },
        '3600s'
    )

    const refreshToken = signJwt({ sessionId: session._id }, '1y')

    res.cookie(
        'refreshToken',
        refreshToken,
        // 1 Year
        { maxAge: 3.154e10, httpOnly: true }
    )

    res.cookie(
        'accessToken',
        accessToken,
        // 5 Min
        { maxAge: 30000, httpOnly: true }
    )
    res.json(session)
}
