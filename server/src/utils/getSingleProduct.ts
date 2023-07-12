import { isValidObjectId } from 'mongoose'
import Product from '../libs/Schemas/Product'

const getSingleProduct = async (productId: string) => {
    if (isValidObjectId(productId)) {
        const prod = await Product.findById({ _id: productId })
        return prod
    }
    return null
}
export default getSingleProduct
