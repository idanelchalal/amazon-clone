import { createContext, useCallback, useEffect, useState } from 'react'
import Config from '../config'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import addToCartHandler from '../utils/addToCart'
import removeFromCartHandler from '../utils/removeFromCart'
import updateCartHandler from '../utils/updateCart'

interface ICartProvider {
    cart?: ICart | null
    addToCart?: (productDto: IPurchaseable) => Promise<any>
    removeFromCartByQty?: (productDto: IPurchaseable) => Promise<any>
    removeFromCart?: (productDto: IPurchaseable) => Promise<any>
    setAbsoluteQty?: (productDto?: IPurchaseable) => any
    itemsQty?: number | null
    error?: any
}

export const CartContext = createContext<ICartProvider>({})

const URI = Config.SERVER_URI + '/cart'

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [context, setContext] = useState<ICart | null>()
    const [trigger, setTrigger] = useState(false)

    // Initial data fetching
    useEffect(() => {
        const getCart = async () =>
            axios.get(URI, { withCredentials: true }).then((res) => {
                return res.data as ICart
            })

        getCart()
            .then((res) => setContext(res))
            .catch((err) => {
                console.error(err)
            })
    }, [trigger])

    const addToCartFn = useCallback(
        async (prodDto: IPurchaseable) => {
            try {
                const res = await addToCartHandler(prodDto)

                // If no products at all, right away adding the product
                if (!context.products && context.products.length > 0) {
                    setContext((lastSnap) => {
                        return { ...lastSnap, products: [prodDto] }
                    })
                    return res
                }

                // Getting product's index if exists.
                const isProductExistsAlready = context.products.findIndex(
                    (prod) => prodDto.productId === prod.productId._id
                )

                // If the product is in the cart already
                if (isProductExistsAlready !== -1) {
                    const cartCopy = JSON.parse(
                        JSON.stringify(context.products)
                    ) as ICart

                    cartCopy.products[isProductExistsAlready].quantity +=
                        prodDto.quantity

                    setContext((lastSnap) => {
                        return { ...lastSnap, products: cartCopy.products }
                    })
                }

                // Adding product first time to the cart
                setContext((lastSnap) => {
                    const prods = [...lastSnap.products]
                    prods.push(prodDto)

                    return { ...lastSnap, products: prods }
                })
                // Trigger a re-render to all the products to populate products data
                setTrigger((last) => !last)

                return res
            } catch (err) {
                setTrigger((last) => !last)
                console.error(err)
            }
        },
        [addToCartHandler, setContext, context]
    )

    const setAbsoluteQuantityFn = useCallback(
        async (prodDto: IPurchaseable) => {
            try {
                if (prodDto.quantity === 0) return removeFromCartFn(prodDto)
                const prodIdx = context.products.findIndex(
                    (prod) => prod.productId._id === prodDto.productId
                )
                // If product isn't found in the cart
                if (prodIdx === -1) return null

                const updatedCart = (await updateCartHandler(prodDto)) as ICart

                const cart = { ...context }
                cart.products = updatedCart.products

                setContext(cart)
            } catch (err) {
                console.error(err)
            }
        },
        [context, updateCartHandler]
    )

    const removeFromCartByQty = useCallback(
        async (prodDto: IPurchaseable) => {
            try {
                const res = await removeFromCartHandler(prodDto)

                const isProductExistsAlready = context.products.findIndex(
                    (prod) => prodDto.productId === prod.productId._id
                )

                if (isProductExistsAlready !== -1) {
                    const cartCopy = JSON.parse(
                        JSON.stringify(context)
                    ) as ICart

                    const isNegative =
                        cartCopy.products[isProductExistsAlready].quantity -
                            prodDto.quantity <=
                        0

                    if (isNegative)
                        cartCopy.products = cartCopy.products.filter(
                            (prod) => prod.productId._id !== prodDto.productId
                        )
                    else
                        cartCopy.products[isProductExistsAlready].quantity -=
                            prodDto.quantity

                    setContext((lastSnap) => {
                        return { ...lastSnap, products: cartCopy.products }
                    })
                }

                setContext((lastSnap) => {
                    const prods = [...lastSnap.products]

                    return { ...lastSnap, products: prods }
                })

                return res
            } catch (err) {
                setTrigger((last) => !last)
                console.error(err)
            }
        },
        [context, setContext, removeFromCartHandler]
    )

    const removeFromCartFn = useCallback(
        async (prodDto: IPurchaseable) => {
            try {
                const res = await removeFromCartHandler(prodDto)

                const isProductExistsAlready = context.products.findIndex(
                    (prod) => prodDto.productId === prod.productId._id
                )

                if (isProductExistsAlready !== -1) {
                    const cartCopy = JSON.parse(
                        JSON.stringify(context)
                    ) as ICart

                    cartCopy.products = cartCopy.products.filter(
                        (prod) => prod.productId._id !== prodDto.productId
                    )

                    setContext((lastSnap) => {
                        return { ...lastSnap, products: cartCopy.products }
                    })
                }

                setContext((lastSnap) => {
                    const prods = [...lastSnap.products]

                    return { ...lastSnap, products: prods }
                })

                return res
            } catch (err) {
                setTrigger((last) => !last)
                console.error(err)
            }
        },
        [context, setContext, removeFromCartHandler]
    )

    return (
        <CartContext.Provider
            value={{
                addToCart: addToCartFn,
                removeFromCart: removeFromCartFn,
                setAbsoluteQty: setAbsoluteQuantityFn,
                cart: context || null,
                itemsQty:
                    (context && context.products && context.products.length) ||
                    null,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
