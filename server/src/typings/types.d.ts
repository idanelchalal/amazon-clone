export interface IProduct {
    title: String
    description: String
    price: Number
    discountPercentage: Number
    rating: Number
    stock: Number
    brand: String
    category: String
    thumbnail: String
    images: String[]
}

export interface IUser {
    name: String
    username: String
    password: String
    email: String
    birthdate: Date
    address: String
    city: String
    mobile: Number
}
