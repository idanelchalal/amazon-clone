import React from 'react'
import { useFetch } from '../hooks/useFetch'

import Skeleton from 'react-loading-skeleton'

import Carousel from '../components/Carousel/Carousel'
import Title from '../components/UI/Title'

import Config from '../config'
import Card_MainPage from '../components/Card_MainPage'
import SkeletonProvider from '../components/UI/SkeletonProvider'
import Card_MainPage_Skeleton from '../components/UI/Skeletons/Card_MainPage_Skeleton'

const MainPage = () => {
    const { data: products, error } = useFetch<any>(
        Config.SERVER_URI + '/products/getAllProducts'
    )
    return (
        <>
            <section
                id="main-page-section"
                className="relative w-full flex-1 bg-main-stone pb-14"
            >
                <div
                    className="w-full h-[20%] md:h-[60%] absolute top-0"
                    id="carousel-main-page"
                >
                    <Carousel />
                </div>
                <div
                    className="w-full relative mt-[350px] z-20
                        gap-y-10 gap-x-5
                        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-12
                    
                    "
                >
                    {(products && !error && (
                        <>
                            {products.slice(0, 8).map((product) => (
                                <Card_MainPage {...product} key={product._id} />
                            ))}
                        </>
                    )) ||
                        (!products && !error && (
                            <>
                                <Card_MainPage_Skeleton />
                                <Card_MainPage_Skeleton />
                                <Card_MainPage_Skeleton />
                                <Card_MainPage_Skeleton />
                                <Card_MainPage_Skeleton />
                                <Card_MainPage_Skeleton />
                                <Card_MainPage_Skeleton />
                                <Card_MainPage_Skeleton />
                            </>
                        )) ||
                        (!products && error && (
                            <>
                                <div className="w-full h-full md:w-[85%] mx-auto bg-white min-h-[33.33%] p-4 rounded-md">
                                    {error && (
                                        <Title
                                            title="An error occurred"
                                            subtitle="Please visit later..."
                                        />
                                    )}
                                </div>
                            </>
                        ))}
                </div>
            </section>
        </>
    )
}

// ||
//                                 (!products && (
//                                     <SkeletonProvider>
//                                         <Skeleton
//                                             count={1}
//                                             width={'15rem'}
//                                             height={'2rem'}
//                                         />
//                                         <Skeleton
//                                             count={1}
//                                             width={'10rem'}
//                                             height={'1rem'}
//                                         />
//                                     </SkeletonProvider>
//                                 ))

export default MainPage
