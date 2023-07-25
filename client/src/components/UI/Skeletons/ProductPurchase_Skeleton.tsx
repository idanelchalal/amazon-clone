import React from 'react'
import SkeletonProvider from '../SkeletonProvider'
import Skeleton from 'react-loading-skeleton'

const ProductPurchase_Skeleton = () => {
    return (
        <SkeletonProvider>
            <article
                id="product-add-to-cart"
                className="w-full border border-zinc-300 rounded-md md:basis-[16.66%] p-4 flex flex-col justify-around"
            >
                <div id="info" className="flex-col gap-y-1 flex">
                    <Skeleton width={100} height={42} />
                    <div id="stock-container">
                        <Skeleton width={64} />

                        <Skeleton width={60} height={18} />
                    </div>
                </div>

                <Skeleton width={'100%'} height={130} />

                <div className="flex-col gap-y-2 flex" id="buttons">
                    <Skeleton width={'100%'} height={24} />
                    <Skeleton width={'100%'} height={24} />
                </div>
            </article>
        </SkeletonProvider>
    )
}

export default ProductPurchase_Skeleton
