import React from 'react'
import { useFetch } from '../hooks/useFetch'

import Carousel from '../components/Carousel/Carousel'
import Title from '../components/UI/Title'

import Config from '../config'
import Card_MainPage from '../components/Card_MainPage'

const MainPage = () => {
    const { data: products, error } = useFetch<any>(
        Config.SERVER_URI + '/products/getAllProducts'
    )
    return (
        <>
            <section
                id="main-page-section"
                className="relative cream-to-gray-bg"
            >
                <article
                    id="main-page-container"
                    className="w-full relative z-10 px-4"
                >
                    <div
                        className="relative w-full h-64"
                        id="carousel-main-page"
                    >
                        <Carousel />
                    </div>

                    <div
                        className="relative z-20 top-2/3 w-full h-full px-5"
                        id="items-main-page"
                    >
                        {error && (
                            <div className="w-full bg-white min-h-[33.33%] p-4 rounded-md">
                                <Title
                                    title="An error occurred"
                                    subtitle="Please visit later..."
                                />
                            </div>
                        )}

                        {products && (
                            <>
                                <div className="w-full flex flex-row flex-wrap gap-4 justify-evenly">
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
