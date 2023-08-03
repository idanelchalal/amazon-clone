import React, { useCallback, useEffect } from 'react'
import Title from './UI/Title'

const CollapsableModalCheckout = ({
    title,
    children,
    subtitle,
    callback,
    startClosed = false,
}: {
    startClosed?: boolean
    title?: string
    subtitle?: string
    callback?: any
    children: React.ReactNode
}) => {
    const cleanTitle = title.split(' ').join('-').toLowerCase()
    const handleClick = useCallback(() => {
        const modal = document.querySelector(
            '#collapsable-modal-container-' + cleanTitle
        )

        const props = [
            'opacity-0',
            'fixed',
            '-z-10',
            'translate-x-[15vw]',
            'scale-0',
            'h-0',
        ]
        props.forEach((prop) => modal.classList.toggle(prop))

        callback && callback()
    }, [cleanTitle])

    useEffect(() => {
        if (startClosed) handleClick()
    }, [handleClick])

    return (
        <section className="my-10" id={cleanTitle + '-collapsable-modal'}>
            <Title
                className="text-orange-700 text-lg font-semibold hover:cursor-pointer"
                title={title}
                subtitle={subtitle}
                onClick={handleClick}
            />
            <article
                id={'collapsable-modal-container-' + cleanTitle}
                className="transition w-full py-2"
            >
                {children}
            </article>
        </section>
    )
}
export default CollapsableModalCheckout
