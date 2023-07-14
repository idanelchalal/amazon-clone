import { FC } from 'react'

const Card_MainPage: FC<Product> = ({ ...product }) => {
    return (
        <div key={product._id} className="bg-white max-w-[20rem]">
            <a href="#">
                <img className=" w-full" src={product.thumbnail} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                        {product.title}
                    </h5>
                </a>
                <span className="mb-2 text-xs font-bold tracking-tight text-gray-900">
                    {product.price}$
                </span>
                <p className="mb-3 font-normal text-gray-700">
                    {product.description}
                </p>
                <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-yellow-600"
                >
                    Shop now
                </a>
            </div>
        </div>
    )
}

export default Card_MainPage
