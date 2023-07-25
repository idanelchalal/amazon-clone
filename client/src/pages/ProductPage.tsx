import { useNavigate, useParams } from 'react-router-dom'

import { useFetch } from '../hooks/useFetch'

import Config from '../config'

import BasicError from '../components/UI/Errors/BasicError'

import ProductDetails from '../components/Product/ProductDetails'
import ProductPurchase from '../components/Product/ProductPurchase'
import ProductImages from '../components/Product/ProductImages'

const ProductPage = () => {
    const { productId } = useParams()
    const navigate = useNavigate()

    if (!productId) navigate('/')

    const { data, error } = useFetch(
        Config.SERVER_URI + '/products/' + productId,
        { method: 'GET' }
    )
    const product = data as Product

    if (error)
        return (
            <>
                <BasicError
                    subtitle={error.message}
                    title="An error occurred"
                ></BasicError>
            </>
        )
    if (product)
        return (
            <section
                id="product-page-section"
                className="relative w-full flex-1 bg-white min-h-screen"
            >
                <div
                    className="h-14 w-full bg-main-stone border border-b-zinc-300 flex items-center px-16 font-semibold mb-4"
                    id="liner-seperator"
                >
                    DISCOUNTS FOR THE HOLIDAY
                </div>

                <div
                    className="w-full h-full flex flex-col md:flex-row px-6"
                    id="product-container"
                >
                    <ProductImages product={product} />

                    <ProductDetails product={product} />

                    <ProductPurchase product={product} />
                </div>
            </section>
        )
}

export default ProductPage
