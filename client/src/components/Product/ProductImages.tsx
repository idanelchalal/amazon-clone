import React, { useState } from 'react'

const ProductImages = ({ product }: { product: Product }) => {
    const [currentPhoto, setCurrentPhoto] = useState<string | null>(
        product.images[0]
    )

    return (
        <article
            id="product-images"
            className="w-full flex flex-col-reverse md:flex-row gap-1 md:basis-[33.33%]"
        >
            <div
                id="thumbnails"
                className="w-full md:w-2/6 lg:w-1/6 md:p-2 lg:p-4 py-2 flex flex-row md:flex-col gap-x-2 md:gap-y-1  md:items-start px-2 items-center justify-start md:m-1 overflow-x-scroll md:overflow-y-scroll scroll-hider"
            >
                {product.images.map((img, index) => (
                    <img
                        src={img}
                        key={product.title + index}
                        onClick={() => setCurrentPhoto(product.images[index])}
                        className="w-16 md:w-full aspect-square object-fill border border-zinc-400 rounded-md hover:cursor-pointer hover:ring-2 ring-offset-1 transition"
                    />
                ))}
            </div>
            <div id="big-image-spectator" className="w-full md:w-5/6">
                <img
                    src={currentPhoto}
                    alt={product.title}
                    className="w-full aspect-square object-fill"
                />
            </div>
        </article>
    )
}

export default ProductImages
