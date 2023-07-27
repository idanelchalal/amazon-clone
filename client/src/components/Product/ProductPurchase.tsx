import React, { useContext, useRef, useState } from 'react'

import Button from '../UI/Button'

import PriceContainer from './PriceContainer'
import Dropdown from '../Dropdown'

import { BiSolidDownArrow } from 'react-icons/bi'
import addToCartHandler from '../../utils/addToCart'
import { AuthContext } from '../../providers/AuthProvider'

function calculateOneWeekForward(givenTime) {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000
    const oneWeekLater = givenTime + oneWeekInMilliseconds
    return new Date(oneWeekLater)
}

const ProductPurchase = ({ product }: { product: Product }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(null)
    const prodInStock = product.stock > 0

    const { session } = useContext(AuthContext)

    const quantity = useRef<number>(1)

    const cartProduct = useRef<IPurchaseable>({
        productId: product._id,
        quantity: 1,
    })

    const updateQty = (qty: number) => {
        setValue(qty)
        const shallow = { ...cartProduct.current }
        cartProduct.current = { ...shallow, quantity: quantity.current }
    }

    const deliveryTime = `Delivery at ${
        calculateOneWeekForward(Date.now()).toISOString().split('T')[0]
    } to Israel or fastest delivery using one of our Express delivery companies within 3 days.`

    return (
        <article
            id="product-add-to-cart"
            className="w-full border border-zinc-300 rounded-md md:basis-[16.66%] p-4 flex flex-col justify-around"
        >
            <div id="info" className="flex-col gap-y-1 flex">
                <PriceContainer currency="$" price={product.price} />
                <div id="stock-container">
                    <span
                        className={`text-2xl
                    ${prodInStock ? 'text-green-700' : 'text-red-700'}`}
                    >
                        {prodInStock && 'In Stock'}
                        {!prodInStock && 'Out of stock'}
                    </span>
                    <button
                        onClick={() => setIsOpen((prevState) => !prevState)}
                        className="text-xs px-3 text-gray-700 outline-none hover:bg-gray-300 bg-gray-200 border border-gray-300 flex justify-center items-center gap-x-2 rounded-l-md"
                    >
                        Qty: {value ? value : value | 1}
                        <BiSolidDownArrow className="text-xs" />
                    </button>
                    {prodInStock && (
                        <div
                            className="absolute"
                            id="dropdown-product-purchase"
                        >
                            {isOpen && (
                                <Dropdown
                                    width="w-18"
                                    values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                    setIsOpen={setIsOpen}
                                    setValue={updateQty}
                                    ref={quantity}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>

            <p className="text-base" id="extra-info-delivery">
                {deliveryTime}
            </p>
            <div className="flex-col gap-y-2 flex" id="buttons">
                <Button
                    wide={true}
                    rounded="full"
                    onClick={() =>
                        addToCartHandler(cartProduct.current, session.userId)
                    }
                >
                    Add to cart
                </Button>
                <Button wide={true} background="orange" rounded="full">
                    Buy now
                </Button>
            </div>
        </article>
    )
}

export default ProductPurchase
