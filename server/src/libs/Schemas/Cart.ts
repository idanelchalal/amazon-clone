import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    products: [
        {
            quantity: { type: Number, required: true },
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        },
    ],
})

export default mongoose.model('Cart', CartSchema)
