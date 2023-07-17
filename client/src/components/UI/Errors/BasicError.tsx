import React from 'react'
import Title from '../Title'

const BasicError = ({
    title,
    subtitle,
    children,
}: {
    title: string
    subtitle?: string
    children?: React.ReactNode
}) => {
    return (
        <>
            <article
                className="bg-white p-4 rounded-md

        "
                id={`error-${title}`}
            >
                <Title title={title} subtitle={subtitle} />
                <p>{children}</p>
            </article>
        </>
    )
}

export default BasicError
