import { useRef } from 'react'
import Button from './UI/Button'

const Address_Dropdown = ({
    addressList,
    callback,
}: {
    addressList: IAddress[]
    callback?: (payload?: any) => any
}) => {
    const ref = useRef(null)
    const handleClick = () => callback(addressList[ref.current.value])

    return (
        <>
            <select
                ref={ref}
                className="bg-zinc-100 py-2 px-1 rounded-md text-xs w-28"
            >
                {addressList &&
                    addressList.map((address, idx) => (
                        <>
                            <optgroup label={`Address ${idx + 1}`}>
                                <option value={idx}>
                                    {address.city} {address.street}
                                    {address.entrance}
                                </option>
                            </optgroup>
                        </>
                    ))}
            </select>
            <Button onClick={handleClick} rounded="md">
                Select Address
            </Button>
        </>
    )
}

export default Address_Dropdown
