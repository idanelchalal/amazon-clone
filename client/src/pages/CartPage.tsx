import { memo, useContext, useMemo } from 'react'

import { CartContext } from '../providers/CartProvider'

import ProductInCart from '../components/Product/ProductInCart'
import PriceContainer from '../components/Product/PriceContainer'
import { toast } from 'react-hot-toast'
import ProductInCartSkeleton from '../components/UI/Skeletons/ProductInCartSkeleton'
import Button from '../components/UI/Button'
import { Link } from 'react-router-dom'

const CartPage = () => {
    const { cart, itemsQty, removeFromCart, setAbsoluteQty } =
        useContext(CartContext)

    const products = cart && cart.products

    const totalPrice = useMemo(() => {
        if (!products) return
        let total = 0
        products.forEach((product) => {
            total += product.quantity * product.productId.price
        })

        return total
    }, [products])

    if (!cart)
        return (
            <article
                id="cart-element-container"
                className="bg-white w-full h-full py-8 px-6 relative"
            >
                <ProductInCartSkeleton />
                <ProductInCartSkeleton />
            </article>
        )

    return (
        <section
            id="cart-page-container"
            className="relative w-full h-full min-h-screen py-3 px-4 bg-main-stone"
        >
            <article
                id="cart-element-container"
                className="bg-white w-full h-full py-8 px-6 relative"
            >
                {products && products.length === 0 ? (
                    <CartEmpty />
                ) : (
                    <>
                        {products &&
                            products.map(({ productId: product, quantity }) => {
                                return (
                                    <ProductInCart
                                        key={product._id}
                                        product={product}
                                        quantity={quantity}
                                        absoluteQty={setAbsoluteQty}
                                        deleteFn={() =>
                                            toast.promise(
                                                removeFromCart({
                                                    productId: product._id,
                                                }),

                                                {
                                                    error: 'An error occured, could not remove item from the cart.',
                                                    loading:
                                                        'Removing item from the cart...',
                                                    success:
                                                        'Item successfully removed from the cart!',
                                                }
                                            )
                                        }
                                    />
                                )
                            })}
                    </>
                )}
            </article>
            <div id="total-price" className="p-5 bg-white w-full flex flex-row">
                <h1 className="text-xl flex gap-2 w-full border-t border-t-zinc-100 py-3 justify-end">
                    Subtotal ({(!itemsQty && <>0 </>) || itemsQty + ' '}
                    {itemsQty === 1 ? 'Item' : 'Items'}):
                    <PriceContainer currency="$" small price={totalPrice} />
                    <Link to="./checkout">
                        <Button>Proceed to checkout</Button>
                    </Link>
                </h1>
            </div>
        </section>
    )
}

export default CartPage

export const CartEmpty = memo(() => (
    <>
        <h1 className="text-3xl mb-2 font-semibold">
            Your Amazon Cart is empty.
        </h1>
        <p className="text-base ">
            Your Shopping Cart lives to serve. Give it purpose — fill it with
            groceries, clothing, household supplies, electronics, and more.
            <br />
            Continue shopping on the Amazon.com homepage, learn about today's
            deals, or visit your Wish List.
        </p>
    </>
))
