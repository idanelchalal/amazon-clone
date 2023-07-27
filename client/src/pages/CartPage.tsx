const CartPage = () => {
    const cartEmpty = (
        <>
            <h1 className="text-3xl mb-2 font-semibold">
                Your Amazon Cart is empty.
            </h1>
            <p className="text-base ">
                Your Shopping Cart lives to serve. Give it purpose — fill it
                with groceries, clothing, household supplies, electronics, and
                more.
                <br />
                Continue shopping on the Amazon.com homepage, learn about
                today's deals, or visit your Wish List.
            </p>
        </>
    )

    return (
        <section
            id="cart-page-container"
            className="relative w-full min-h-screen py-3 px-4 bg-main-stone"
        >
            <article
                id="cart-element-container"
                className="bg-white w-full py-8 px-6"
            ></article>
        </section>
    )
}

export default CartPage
