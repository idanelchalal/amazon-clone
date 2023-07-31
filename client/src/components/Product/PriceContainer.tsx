import React from 'react'

const PriceContainer = ({
    price,
    currency,
    small,
}: {
    small?: boolean
    price: number
    currency: '$' | '€' | '₪'
}) => {
    if (small)
        return (
            <>
                <div id="price-container" className="flex">
                    <h3 className="text-2xl font-semibold">
                        {currency}
                        {price}
                    </h3>
                </div>
            </>
        )

    return (
        <div id="price-container" className="flex">
            <span className="text-[12px] mt-1">{currency}</span>
            <h3 className="text-5xl md:text-4xl">{price}</h3>
        </div>
    )
}

export default PriceContainer
