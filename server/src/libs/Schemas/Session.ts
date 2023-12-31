import mongoose from 'mongoose'

import { ISession } from '../../typings/types'

const SessionSchema = new mongoose.Schema<ISession>(
    {
        email: { required: true, type: String },
        name: { type: String },
        valid: { default: true, type: Boolean },
        userId: { type: mongoose.Types.ObjectId },
    },
    { timestamps: true }
)

export default mongoose.model('Session', SessionSchema)
