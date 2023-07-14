import { FC, useState, useCallback } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface CarouselProps {}

// TODO: IMPLEMENT A LOGIC FOR DATA FETCHING TO DISPLAY THE CAROUSEL DYNAMICALLY
const photos = ['/carousel-1.jpg', '/carousel-2.jpg']

const Carousel: FC<CarouselProps> = ({}) => {
    const [currentPhoto, setCurrentPhoto] = useState(0)

    const rightArrowFn = useCallback(() => {
        if (currentPhoto === photos.length - 1) setCurrentPhoto(0)
        else setCurrentPhoto(currentPhoto + 1)
    }, [setCurrentPhoto, currentPhoto])

    const leftArrowFn = useCallback(() => {
        if (currentPhoto === 0) setCurrentPhoto(photos.length - 1)
        else setCurrentPhoto(currentPhoto - 1)
    }, [setCurrentPhoto, currentPhoto])

    return (
        <>
            <div id="carousel-img" className="relative h-full w-full right-3">
                <img
                    key={currentPhoto}
                    src={photos[currentPhoto]}
                    className="absolute select-none animated fadeIn w-full h-full"
                    alt="Carousel image"
                />
                <div
                    id="carousel-arrows"
                    className="absolute flex justify-between items-center h-full w-full"
                >
                    <div
                        onClick={leftArrowFn}
                        className="h-full flex items-center cursor-pointer px-4"
                        id="left-arrow-carousel"
                    >
                        <AiOutlineLeft className="text-3xl" />
                    </div>
                    <div
                        onClick={rightArrowFn}
                        className="h-full flex items-center cursor-pointer px-4"
                        id="right-arrow-carousel "
                    >
                        <AiOutlineRight className="text-3xl" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel
