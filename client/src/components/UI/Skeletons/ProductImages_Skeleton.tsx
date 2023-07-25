import React from 'react'
import Skeleton from 'react-loading-skeleton'
import SkeletonProvider from '../SkeletonProvider'

const ProductImages_Skeleton = () => {
    return (
        <SkeletonProvider>
            <article
                id="product-images"
                className="w-full flex flex-col-reverse md:flex-row gap-1 md:basis-[33.33%]"
            >
                <div
                    id="thumbnails"
                    className="w-full md:w-2/6 lg:w-1/6 md:p-2 lg:p-4 py-2 flex flex-row md:flex-col gap-x-2 md:gap-y-1  md:items-start px-2 items-center justify-start md:m-1 overflow-x-scroll md:overflow-y-scroll scroll-hider"
                >
                    <Skeleton className="h-16 md:w-full aspect-square rounded-md" />
                    <Skeleton className="h-16 md:w-full aspect-square rounded-md" />
                    <Skeleton className="h-16 md:w-full aspect-square rounded-md" />
                    <Skeleton className="h-16 md:w-full aspect-square rounded-md" />
                </div>
                <div id="big-image-spectator" className="w-full md:w-5/6">
                    <Skeleton className="w-full aspect-square object-fill" />
                </div>
            </article>
        </SkeletonProvider>
    )
}

export default ProductImages_Skeleton
