import { FC } from 'react'

interface TitleProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    > {
    title: string
    subtitle?: string
}

const Title: FC<TitleProps> = ({ subtitle, title, ...props }) => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl mb-1 font-semibold" {...props}>
                {title}
            </h1>
            {subtitle && (
                <p className="text-xs md:text-base text-gray-400 font-semibold">
                    {subtitle}
                </p>
            )}
        </>
    )
}

export default Title
