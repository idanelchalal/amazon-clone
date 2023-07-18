import { Request, Response } from 'express'
import { getUserByEmail } from '../../utils/getUser'

import bcrypt from 'bcrypt'

import { signJwt, verifyJwt } from '../../libs/jwt/jwt.util'

export default async function createSessionHandler(
    req: Request,
    res: Response
) {
    const { email, password } = req.body

    // Ensuring existence of the client's email.
    const user = await getUserByEmail(email)
    if (!user) return res.status(401).json('The email does not exist.')

    // Comparing the client's password to the password found in the database

    // const isCorrectPassword = await bcrypt.compare(
    //     password,
    //     user.password as string
    // )

    const isCorrectPassword = password === user.password

    if (!isCorrectPassword)
        return res.status(401).json('Password is incorrect.')

    // Creating an access token
    const accessToken = signJwt(
        {
            email: user.email,
            name: user.name,
            username: user.username,
            birthdate: user.birthdate,
        },
        '1h'
    )

    res.cookie('accessToken', accessToken, { maxAge: 30000, httpOnly: true })
    res.send(verifyJwt(accessToken).payload)
}
