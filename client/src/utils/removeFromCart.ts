import axios from 'axios'
import Config from '../config'

const removeFromCartHandler = async (productDto: IPurchaseable) => {
    const { data } = await axios.get(Config.SERVER_URI + '/auth/session', {
        withCredentials: true,
    })
    if (!data) {
        // User's session is invalid
        location.href = '/auth/login'
        console.error(
            'Session error: Could not add item to cart due to invalid session'
        )
    }

    const { data: deletedProduct } = await axios.post(
        Config.SERVER_URI + '/cart/delete-from-cart',
        { productDto },
        {
            withCredentials: true,
        }
    )

    return deletedProduct
}

export default removeFromCartHandler
