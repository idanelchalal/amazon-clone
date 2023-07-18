import mongoose from 'mongoose'

import { IUser } from '../../typings/types'

const UserSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        address: { type: String, required: false },
        birthdate: { type: Date, required: false },
        city: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
)

export default mongoose.model('User', UserSchema)
