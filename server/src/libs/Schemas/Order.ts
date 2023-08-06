import mongoose, { Schema } from 'mongoose'
import { IOrder } from '../../typings/types'

const OrderSchema = new mongoose.Schema<IOrder>(
    {
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        totalPrice: { default: 0, required: true, type: Number },
        userId: [{ type: Schema.Types.ObjectId, ref: 'User', unique: true }],
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Order', OrderSchema)
