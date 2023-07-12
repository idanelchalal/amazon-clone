import React from 'react'
import Carousel from '../components/Carousel/Carousel'
import Title from '../components/UI/Title'

const MainPage = () => {
    return (
        <>
            <section
                id="main-page-section"
                className="cream-to-gray-bg relative"
            >
                <article
                    id="main-page-container"
                    className="w-full relative z-10 h-screen px-4"
                >
                    <div
                        className="relative w-full h-[25%] md:h-[33.33%]"
                        id="carousel-main-page"
                    >
                        <Carousel />
                    </div>
                    <div
                        className="relative z-20 w-full h-full px-5"
                        id="items-main-page"
                    >
                        <div className="w-full bg-white min-h-[33.33%] p-4 rounded-md">
                            <Title
                                title="No items found"
                                subtitle="Please come and visit later."
                            />
                        </div>
                    </div>
                </article>
            </section>
        </>
    )
}

export default MainPage
