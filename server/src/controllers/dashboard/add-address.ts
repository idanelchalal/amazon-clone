import { Request, Response } from 'express'
import { FormError, IUser } from '../../typings/types'
import { getUserById } from '../../utils/getUser'
import Address from '../../libs/Schemas/Address'

import * as yup from 'yup'

const addressValidation = yup.object({
    street: yup.string().required().min(4).max(50),
    city: yup.string().required().min(2).max(25),
})

const addAddress = async (req: Request, res: Response) => {
    //@ts-ignore
    const user = req.user as IUser
    const { address } = req.body

    try {
        // Schema validation
        await addressValidation.validate(address)
    } catch (error: any) {
        const { path, errors } = error
        return res.status(500).json({
            errors,
            path,
        } as FormError)
    }

    try {
        const dbUser = await getUserById(
            //@ts-ignore
            user.userId
        )

        if (!dbUser) return res.status(500).json('INVALID_SESSION')
        const newAddress = await new Address({
            ...address,
        }).save()

        dbUser.address?.push(newAddress)
        //@ts-ignore
        await dbUser.save()
        return res.status(201).json(newAddress)
    } catch (err) {
        console.error(err)
        return res.status(500).json('SERVER_ERROR')
    }
}
export default addAddress
