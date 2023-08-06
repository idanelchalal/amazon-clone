import { Request, Response } from 'express'
import { getUserById } from '../../utils/getUser'

const getAddressList = async (req: Request, res: Response) => {
    //@ts-ignore
    const user = req.user

    try {
        const userInstance = await getUserById(
            //@ts-ignore
            user.userId
        )

        await userInstance?.populate('address')
        return res.json(userInstance?.address || null)
    } catch (error) {
        return res.json(error)
    }
}
export default getAddressList
