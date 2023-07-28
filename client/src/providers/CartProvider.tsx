import { createContext, useEffect, useState } from 'react'
import Config from '../config'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import addToCartHandler from '../utils/addToCart'
import removeFromCartHandler from '../utils/removeFromCart'

interface ICartProvider {
    cart?: ICart | null
    addToCart?: (productDto: IPurchaseable) => Promise<any>
    removeFromCart?: (productDto: IPurchaseable) => Promise<any>
    itemsQty?: number | null
    error?: any
}

export const CartContext = createContext<ICartProvider>({})

const URI = Config.SERVER_URI + '/cart'

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [context, setContext] = useState<ICart | null>()

    // Initial data fetching
    useEffect(() => {
        const getCart = async () =>
            axios.get(URI, { withCredentials: true }).then((res) => {
                return res.data as ICart
            })

        getCart()
            .then((res) => setContext(res))
            .catch((err) => {
                toast.error('Fail to get cart.')
                console.error(err)
            })
    }, [])

    const addToCartFn = async (prodDto: IPurchaseable) => {
        try {
            const res = await addToCartHandler(prodDto)

            const isProductExistsAlready = context.products.findIndex(
                (prod) => prodDto.productId === prod.productId
            )

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

            setContext((lastSnap) => {
                const prods = lastSnap.products.slice()
                prods.push(prodDto)

                return { ...lastSnap, products: prods }
            })

            return res
        } catch (err) {
            console.error(err)
        }
    }

    // TODO: IMPLEMENT REMOVE FN
    const removeFromCartFn = async (prodDto: IPurchaseable) => {
        try {
            const res = await removeFromCartHandler(prodDto)

            const isProductExistsAlready = context.products.findIndex(
                (prod) => prodDto.productId === prod.productId
            )

            if (isProductExistsAlready !== -1) {
                const cartCopy = JSON.parse(JSON.stringify(context)) as ICart

                const isNegative =
                    cartCopy.products[isProductExistsAlready].quantity -
                        prodDto.quantity <=
                    0

                if (isNegative)
                    cartCopy.products = cartCopy.products.filter(
                        (prod) => prod.productId !== prodDto.productId
                    )
                else
                    cartCopy.products[isProductExistsAlready].quantity -=
                        prodDto.quantity

                setContext((lastSnap) => {
                    return { ...lastSnap, products: cartCopy.products }
                })
            }

            setContext((lastSnap) => {
                const prods = lastSnap.products.slice()

                return { ...lastSnap, products: prods }
            })

            return res
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <CartContext.Provider
            value={{
                addToCart: addToCartFn,
                removeFromCart: removeFromCartFn,
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
