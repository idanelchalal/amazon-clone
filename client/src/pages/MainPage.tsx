import React, { useMemo } from 'react'
import { useFetch } from '../hooks/useFetch'

import Config from '../config'

import Carousel from '../components/Carousel/Carousel'

import Card_MainPage from '../components/Card_MainPage'
import Card_MainPage_Skeleton from '../components/UI/Skeletons/Card_MainPage_Skeleton'

import BasicError from '../components/UI/Errors/BasicError'

const MainPage = () => {
    const { data: products, error } = useFetch<any>(
        Config.SERVER_URI + '/products/getAllProducts'
    )

    const skeletons = useMemo(
        () => (
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
        ),
        []
    ) as React.ReactNode

    return (
        <>
            <section
                id="main-page-section"
                className="relative w-full flex-1 bg-main-stone pb-14"
            >
                <div
                    className="w-full h-[20%] md:h-[60%] sm:h-[40%] absolute top-0"
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
                        (!products && !error && skeletons) ||
                        (!products && error && (
                            <>
                                {error && (
                                    <BasicError title="Not found">
                                        An error occurred, please come back
                                        later.
                                    </BasicError>
                                )}
                            </>
                        ))}
                </div>
            </section>
        </>
    )
}

export default MainPage
