import React from 'react'
import { useFetch } from '../hooks/useFetch'

import Skeleton from 'react-loading-skeleton'

import Carousel from '../components/Carousel/Carousel'
import Title from '../components/UI/Title'

import Config from '../config'
import Card_MainPage from '../components/Card_MainPage'
import SkeletonProvider from '../components/UI/SkeletonProvider'

const MainPage = () => {
    const { data: products, error } = useFetch<any>(
        Config.SERVER_URI + '/products/getAllProducts'
    )
    return (
        <>
            <section
                id="main-page-section"
                className="relative cream-to-gray-bg w-[98%] mx-auto h-full"
            >
                <article
                    id="main-page-container"
                    className="w-full h-full relative z-10 px-3"
                >
                    <div
                        className="absolute w-full h-full"
                        id="carousel-main-page"
                    >
                        <Carousel />
                    </div>

                    <div
                        className="relative z-20 w-full px-5 h-full"
                        id="items-main-page"
                    >
                        {!products && (
                            <div className="w-full h-full md:w-[85%] mx-auto bg-white min-h-[33.33%] p-4 rounded-md">
                                {(error && (
                                    <Title
                                        title="An error occurred"
                                        subtitle="Please visit later..."
                                    />
                                )) ||
                                    (!products && (
                                        <SkeletonProvider>
                                            <Skeleton
                                                count={1}
                                                width={'15rem'}
                                                height={'2rem'}
                                            />
                                            <Skeleton
                                                count={1}
                                                width={'10rem'}
                                                height={'1rem'}
                                            />
                                        </SkeletonProvider>
                                    ))}
                            </div>
                        )}

                        {products && (
                            <>
                                <div className="w-full relative flex flex-row flex-wrap gap-4 justify-evenly">
                                    {products.slice(0, 6).map((product) => (
                                        <Card_MainPage
                                            {...product}
                                            key={product._id}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </article>
            </section>
        </>
    )
}

export default MainPage
