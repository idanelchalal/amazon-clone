import React from 'react'
import SkeletonProvider from '../SkeletonProvider'
import Skeleton from 'react-loading-skeleton'

const ProductInCartSkeleton = () => {
    return (
        <SkeletonProvider>
            <article className="relative w-full h-full md:p-4 p-1 flex flex-col md:flex-row">
                <div className="w-full md:w-44 aspect-square" id="img-wrapper">
                    <Skeleton className="w-full h-full" />
                </div>

                <div
                    className="w-full h-full p-1 md:p-4 flex flex-col gap-y-2"
                    id="product-details"
                >
                    <h1 className="text-xl">
                        <Skeleton width={'60%'} height={30} />
                    </h1>
                    <div id="brand-value">
                        <Skeleton width={60} height={20} />

                        <Skeleton width={60} height={20} />
                    </div>
                    <div
                        className="w-full h-full flex flex-col md:flex-row gap-y-3 md:gap-y-0 md:gap-x-3"
                        id="controllers"
                    >
                        <Skeleton width={28} height={15} />

                        <Skeleton width={20} height={15} />
                    </div>
                </div>
            </article>
        </SkeletonProvider>
    )
}

export default ProductInCartSkeleton
