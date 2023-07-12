import Product from '../libs/Schemas/Product'

const getAllProducts = async () => {
    const prod = await Product.find({})
    return prod
}
export default getAllProducts
