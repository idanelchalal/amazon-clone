const addToCartHandler = async (productDto: IPurchaseable, userId) => {
    if (!userId) window.location.href = '/auth/signin'
}

export default addToCartHandler
