import { useCallback, useId } from 'react'

import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'

function calculateStars(rating) {
    const fullStars = Math.floor(rating)
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStar

    return { fullStars, halfStar, emptyStars }
}

const Rating = ({ rating }: { rating: number }) => {
    const { fullStars, halfStar, emptyStars } = calculateStars(rating)

    const renderStars = useCallback(
        (count, type) => {
            const stars = []

            for (let i = 0; i < count; i++) {
                stars.push(
                    (type === 'full' && BsStarFill) ||
                        (type === 'half' && BsStarHalf) ||
                        (type === 'empty' && BsStar)
                )
            }

            return stars.map((Star) => <Star key={useId()} />)
        },
        [rating]
    )
    return (
        <section id="rating-section">
            <div className="flex gap-x-1 items-center">
                Ratings:
                {renderStars(fullStars, 'full')}
                {renderStars(halfStar, 'half')}
                {renderStars(emptyStars, 'empty')}
            </div>
        </section>
    )
}

export default Rating
