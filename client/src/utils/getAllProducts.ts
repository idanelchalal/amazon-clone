import axios from 'axios'
import Config from '../config'

const getAllProducts = async () => {
    try {
        const { data: products } = await axios.get(
            Config.SERVER_URI + '/api/products/getAllProducts'
        )
        return products
    } catch (err: any) {
        return err
    }
}

export default getAllProducts
