import { Request, Response } from 'express'

import { object, string, ref } from 'yup'

import { getUserByEmail } from '../../utils/getUser'

import User from '../../libs/Schemas/User'

import { bcryptHash } from '../../libs/bcrypt/bcrypt.utils'

import { FormError } from '../../typings/types'

const formSchema = object({
    Email: string().required().email(),
    Password: string().min(6).required(),
    PasswordVerify: string()
        .required('Confirm password field is required.')
        .oneOf([ref('Password')], 'Your passwords do not match.'),

    Name: string().required().min(2),
})

export default async function createUser(req: Request, res: Response) {
    const { Email, Password, Name, PasswordVerify } = req.body
    try {
        // Schema validation
        await formSchema.validate({ Email, Password, Name, PasswordVerify })
    } catch (error: any) {
        const { path, errors } = error
        return res.status(500).json({
            errors,
            path,
        } as FormError)
    }

    // Ensuring email doesn't exist
    const isEmailTaken = await getUserByEmail(Email)
    if (isEmailTaken)
        return res.status(422).json({
            errors: ['Email already exists.'],
            path: 'Email',
        } as FormError)

    try {
        const encryptedPassword = await bcryptHash(Password)

        const user = new User({
            email: Email,
            password: encryptedPassword,
            name: Name,
        })

        await user.save()

        const dto = user.toObject()
        //@ts-ignore
        delete dto.password

        return res.status(201).json(dto)
    } catch (error) {
        return res.status(500)
    }
}
