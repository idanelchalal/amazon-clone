import axios from 'axios'
import Config from '../config'

const addToCartHandler = async (productDto: IPurchaseable) => {
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

    const { data: addedProduct } = await axios.post(
        Config.SERVER_URI + '/cart/add-to-cart',
        { productDto },
        { withCredentials: true }
    )

    return addedProduct
}

export default addToCartHandler
