import React from 'react'

const PaymentPhase = ({
    phaseHandler,
}: {
    phaseHandler?: (data) => Promise<any> | any
}) => {
    return (
        <section
            id="details-form"
            className="w-full flex flex-col gap-2 transition"
        >
            <article className="w-full border border-zinc-200 rounded-md p-4">
                <h1
                    id="add-new-address-title"
                    className="text-xl font-semibold mb-3"
                >
                    Select a payment method
                </h1>
            </article>
        </section>
    )
}

export default PaymentPhase
