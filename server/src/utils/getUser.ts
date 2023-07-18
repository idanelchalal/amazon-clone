import { isValidObjectId } from 'mongoose'

import { IUser } from '../typings/types'

import User from '../libs/Schemas/User'

export const getUserByEmail = async (email: string) => {
    if (email) return (await User.findOne({ email: email })) as IUser
    return null
}

export const getUserById = async (id: string) => {
    if (isValidObjectId(id)) return (await User.findById(id)) as IUser
    return null
}
