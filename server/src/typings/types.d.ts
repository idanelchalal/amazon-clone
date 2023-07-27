export interface IProduct {
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
}

export interface IUser {
    _id: any
    name: string
    username: string
    password: string
    email: string
    birthdate: Date
    address: string
    city: string
    mobile: Number
}

export type FormError = {
    path: string
    errors: [string]
}

export interface ISession {
    _id?: string
    userId: any
    email: string
    valid: boolean
    name?: string
}
