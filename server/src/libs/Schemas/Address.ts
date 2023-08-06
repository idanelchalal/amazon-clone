import mongoose from 'mongoose'
import { IAddress } from '../../typings/types'

const AddressSchema = new mongoose.Schema<IAddress>(
    {
        city: { type: String },
        country: { type: String },
        door: { type: String },
        entrance: { type: String },
        floor: { type: Number },
        zip_code: { type: Number },
        street: { type: String },
    },
    { timestamps: true }
)

export default mongoose.model('Address', AddressSchema)
