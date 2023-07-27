import { Request, Response } from 'express'
import { getUserByEmail } from '../../utils/getUser'

import { signJwt, verifyJwt } from '../../libs/jwt/jwt.util'
import { bcryptCompare } from '../../libs/bcrypt/bcrypt.utils'
import { createSession } from '../../utils/session.utils'
import { FormError } from '../../typings/types'

export default async function createSessionHandler(
    req: Request,
    res: Response
) {
    const { Email: email, Password: password } = req.body

    // Ensuring existence of the client's email.
    const user = await getUserByEmail(email)
    if (!user)
        return res.status(401).json({
            errors: ['Email does not exists.'],
            path: 'Email',
        } as FormError)

    // Comparing the client's password to the password found in the database

    const isCorrectPassword = await bcryptCompare(
        password,
        user.password as string
    )

    if (!isCorrectPassword)
        return res.status(401).json({
            errors: ['Password is incorrect.'],
            path: 'Password',
        } as FormError)

    const session = await createSession(
        email,
        user.name,
        //@ts-ignore
        user._id
    )

    // Creating an access token
    const accessToken = signJwt(
        {
            userId: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
            birthdate: user.birthdate,
        },
        '30000s'
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
        { maxAge: 300000, httpOnly: true }
    )
    res.status(201).json(session)
}
