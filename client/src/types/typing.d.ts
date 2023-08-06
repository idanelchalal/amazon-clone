interface Product {
    _id: string
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
    quantity?: number
}

interface ICart {
    products: Array<IPurchaseable>
    userId: string
    totalPrice?: number | null
}

interface IAddress {
    _id?: any
    country?: string
    street?: string
    city?: string
    zip_code?: number
    entrance?: string
    floor?: Number
    door?: string
}
