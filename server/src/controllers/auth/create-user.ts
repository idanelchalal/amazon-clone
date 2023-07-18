import { Request, Response } from 'express'

import { object, string, number, date, InferType } from 'yup'

import { getUserByEmail } from '../../utils/getUser'

import User from '../../libs/Schemas/User'
import { bcryptHash } from '../../libs/bcrypt/bcrypt.utils'

// type RegisterFormType = InferType<typeof formSchema>

const formSchema = object({
    Email: string().required().email(),
    Password: string().min(6).required(),
    Name: string().required().min(2),
})

export default async function createUser(req: Request, res: Response) {
    const { Email, Password, Name } = req.body
    try {
        // Schema validation
        await formSchema.validate({ Email, Password, Name })
    } catch (error: any) {
        return res.status(500).json('INVALID_FORM')
    }

    // Ensuring email doesn't exist
    const isEmailTaken = await getUserByEmail(Email)
    if (isEmailTaken) return res.status(422).json('EMAIL_EXISTS')

    try {
        const encryptedPassword = await bcryptHash(Password)

        const user = new User({
            email: Email,
            password: encryptedPassword,
            name: Name,
        })

        await user.save()

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json('SERVER_ERROR')
    }
}
