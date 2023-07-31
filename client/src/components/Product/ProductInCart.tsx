import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PriceContainer from './PriceContainer'
import Dropdown from '../Dropdown'
import { BiSolidDownArrow } from 'react-icons/bi'
import DeleteProductButton from './action-buttons/DeleteProductButton'
import { toast } from 'react-hot-toast'
import { PulseLoader } from 'react-spinners'

const ProductInCart = ({
    product,
    quantity,
    deleteFn,
    absoluteQty,
}: {
    product: Product
    deleteFn?: () => void
    absoluteQty?: (prodDto: IPurchaseable) => any
    quantity: number
}) => {
    const prodInStock = product.stock > 0

    const refQty = useRef(quantity)

    const [qty, setQty] = useState(quantity)
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const updateQty = useCallback(
        async (option) => {
            const prodDto: IPurchaseable = {
                productId: product._id,
                quantity: option,
            }

            try {
                setIsUpdating(true)
                await toast.promise(absoluteQty(prodDto), {
                    error: `Could not update product's quantity`,
                    loading: 'Loading...',
                    success: "Product's quantity updated successfully!",
                })
            } catch (error) {
                toast.error('Something went wrong...')
            } finally {
                setIsUpdating(false)
            }
        },
        [toast, product]
    )

    return (
        <article
            id={product._id}
            className="relative w-full h-full md:p-4 p-1 flex flex-col md:flex-row"
        >
            {isUpdating && (
                <div
                    className="absolute z-10 w-full h-full flex items-center justify-center
                backdrop-blur-sm"
                    id="backdrop"
                >
                    <PulseLoader size={32} color="#ffb900" />
                </div>
            )}
            <div className="w-full md:w-44 aspect-square" id="img-wrapper">
                <Link to={'../product/' + product._id}>
                    <img
                        className="w-full h-full hover:cursor-pointer hover:ring-1 transition"
                        src={product.thumbnail}
                        alt={product.description}
                    />
                </Link>
            </div>

            <div
                className="w-full h-full p-1 md:p-4 flex flex-col gap-y-2"
                id="product-details"
            >
                <h1 className="text-xl">
                    {product.title} - {product.description}
                </h1>
                <div id="brand-value">
                    <span className="text-xl md:text-base">
                        {product.brand}
                    </span>
                    <span
                        className={`flex md:text-xs text-xl
                        ${prodInStock ? 'text-green-700' : 'text-red-700'}`}
                    >
                        {prodInStock && 'In Stock'}
                        {!prodInStock && 'Out of stock'}
                    </span>
                    <PriceContainer
                        small={true}
                        currency="$"
                        price={product.price}
                        key={product.price + product._id}
                    />
                </div>
                <div
                    className="w-full h-full flex flex-col md:flex-row gap-y-3 md:gap-y-0 md:gap-x-3"
                    id="controllers"
                >
                    <button
                        onClick={() => setIsOpen((prevState) => !prevState)}
                        className="w-28 text-xs px-3 text-gray-700 outline-none hover:bg-gray-300 bg-gray-200 border border-gray-300 flex justify-center items-center gap-x-2 rounded-l-md"
                    >
                        Qty: {qty ? qty : qty | 1}
                        <BiSolidDownArrow className="text-xs" />
                    </button>
                    {isOpen && (
                        <div
                            className="absolute"
                            id="dropdown-product-purchase"
                        >
                            <Dropdown
                                ref={refQty}
                                values={[1, 2, 3, 4, 5]}
                                callback={updateQty}
                                setValue={setQty}
                                width={'w-28'}
                                setIsOpen={setIsOpen}
                                key={product._id + 'dropdown'}
                            />
                        </div>
                    )}

                    <DeleteProductButton value="Delete" fn={deleteFn} />
                </div>
            </div>
        </article>
    )
}

export default ProductInCart
