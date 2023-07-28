import { memo, useContext } from 'react'
import { CartContext } from '../providers/CartProvider'

const CartPage = () => {
    const { cart, itemsQty, removeFromCart } = useContext(CartContext)

    const products = cart && cart.products

    return (
        <section
            id="cart-page-container"
            className="relative w-full min-h-screen py-3 px-4 bg-main-stone"
        >
            <article
                id="cart-element-container"
                className="bg-white w-full py-8 px-6"
            >
                {products && products.length === 0 ? (
                    <CartEmpty />
                ) : (
                    <>
                        {products &&
                            products.map((prod) => (
                                <div key={prod.productId}>
                                    {prod.quantity} {prod.productId}
                                    <button
                                        onClick={() =>
                                            removeFromCart({
                                                productId: prod.productId,
                                                quantity: 1,
                                            })
                                        }
                                    >
                                        remove 1
                                    </button>
                                </div>
                            ))}
                    </>
                )}
            </article>
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
