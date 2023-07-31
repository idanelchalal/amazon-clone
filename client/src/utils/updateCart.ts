import axios from 'axios'
import Config from '../config'

const updateCartHandler = async (productDto: IPurchaseable) => {
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

    const { data: addedProduct } = await axios.put(
        Config.SERVER_URI + '/cart/set-cart',
        { productDto },
        { withCredentials: true }
    )

    return addedProduct
}

export default updateCartHandler
