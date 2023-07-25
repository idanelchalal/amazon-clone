import PriceContainer from './PriceContainer'
import Rating from './Rating'

const ProductDetails = ({ product }: { product: Product }) => {
    return (
        <article id="product-details" className="w-full md:basis-1/2 p-4">
            <h1 className="font-semibold text-2xl max-w-full">
                {product?.title} - {product?.description}
            </h1>

            <Rating rating={product.rating} />

            <PriceContainer currency="$" price={product.price} />

            <div className="grid grid-cols-2 grid-flow-row-dense w-1/2 mt-6">
                <div id="brand-row">
                    <span className="font-semibold">Brand</span>
                </div>
                <div id="brand-value">
                    <span>{product.brand}</span>
                </div>

                <div id="prod-row" className="font-semibold">
                    Description
                </div>
                <div id="prod-value">{product.description}</div>
            </div>
        </article>
    )
}

export default ProductDetails
