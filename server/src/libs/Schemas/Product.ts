import mongoose from 'mongoose'

import { IProduct } from '../../typings/types'

const ProductSchema = new mongoose.Schema<IProduct>(
    {
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: { type: String, required: true },
        discountPercentage: { type: Number },
        images: { type: [String] },
        price: { type: Number, required: true },
        rating: { type: Number, default: 0 },
        stock: { type: Number, default: 0 },
        thumbnail: {
            type: String,
            default:
                'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=',
        },
        title: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Product', ProductSchema)
