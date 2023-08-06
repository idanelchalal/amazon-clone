import axios from 'axios'
import Config from '../config'

const addAddressHandler = async (address: IAddress) => {
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

    const { data: addedAddress } = await axios.post(
        Config.SERVER_URI + '/dashboard/add-address',
        { address },
        { withCredentials: true }
    )

    return addedAddress
}

export default addAddressHandler
