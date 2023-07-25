import React from 'react'
import SkeletonProvider from '../SkeletonProvider'
import Skeleton from 'react-loading-skeleton'

const ProductDetails_Skeleton = () => {
    return (
        <SkeletonProvider>
            <article id="product-details" className="w-full md:basis-1/2 p-4">
                <h1 className="font-semibold text-2xl max-w-full">
                    <Skeleton width={'95%'} height={20} />
                    <Skeleton width={'95%'} height={20} />
                    <Skeleton width={'85%'} height={20} />
                </h1>

                <Skeleton width={160} height={20} />

                <Skeleton width={64} height={60} />

                <div className="grid grid-cols-2 grid-flow-row-dense w-1/2 mt-6">
                    <div id="brand-row">
                        <span className="font-semibold">
                            <Skeleton width={'50%'} height={16} />
                        </span>
                    </div>
                    <div id="brand-value">
                        <span>
                            <Skeleton width={'53%'} height={16} />
                        </span>
                    </div>

                    <div id="prod-row">
                        <Skeleton width={'78%'} height={16} />
                    </div>
                    <div id="prod-value">
                        <Skeleton width={'33%'} height={16} />
                    </div>
                </div>
            </article>
        </SkeletonProvider>
    )
}

export default ProductDetails_Skeleton
