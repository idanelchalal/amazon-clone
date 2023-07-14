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
            <div
                id="carousel-img"
                className="
                relative
                h-full w-full grad-fade
                "
            >
                <img
                    key={currentPhoto}
                    src={photos[currentPhoto]}
                    className="select-none animated object-cover fadeIn w-full h-full "
                    alt="Carousel image"
                />
                <div
                    id="carousel-arrows"
                    className="top-0 absolute mt-[10%] flex justify-between w-full"
                >
                    <div
                        onClick={leftArrowFn}
                        className="cursor-pointer px-4"
                        id="left-arrow-carousel"
                    >
                        <AiOutlineLeft className="text-3xl" />
                    </div>
                    <div
                        onClick={rightArrowFn}
                        className="cursor-pointer px-4"
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
