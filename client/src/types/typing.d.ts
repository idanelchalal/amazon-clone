interface Product {
    _id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    createdAt: Date
}

type FormError = {
    path: string
    errors: Array<string>
}

interface IPurchaseable {
    productId: any
    quantity: number
}
