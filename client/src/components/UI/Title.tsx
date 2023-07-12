import { FC } from 'react'

interface TitleProps {
    title: string
    subtitle?: string
}

const Title: FC<TitleProps> = ({ subtitle, title }) => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl mb-1 font-semibold">{title}</h1>
            {subtitle && (
                <p className="text-xs md:text-base text-gray-400 font-semibold">
                    {subtitle}
                </p>
            )}
        </>
    )
}

export default Title
