import axios from 'axios'

import Config from '../config'

import ClipLoader from 'react-spinners/ClipLoader'

import { useState } from 'react'

import ShippingPhase from '../components/Checkout/ShippingPhase'
import PaymentPhase from '../components/Checkout/PaymentPhase'

import CollapsableModalCheckout from '../components/CollapsableModalCheckout'

enum PhaseEnum {
    SHIPPING,
    PAYMENT,
    NONE,
}

const CheckoutPage = () => {
    const [phase, setPhase] = useState<PhaseEnum>(PhaseEnum.SHIPPING)
    const [data, setData] = useState({
        shipping: null,
        payment: null,
    })

    const toggler = (phase: PhaseEnum) => {
        console.log(phase)
        setPhase(phase !== PhaseEnum.NONE ? PhaseEnum.NONE : phase)
    }

    const phaseHandler = async (payload) => {
        if (phase === PhaseEnum.SHIPPING) {
            setPhase(PhaseEnum.PAYMENT)
            setData((prev) => {
                return {
                    ...prev,
                    shipping: payload,
                }
            })
        }

        if (phase === PhaseEnum.PAYMENT) {
            setData((prev) => {
                return {
                    ...prev,
                    payment: payload,
                }
            })
        }
    }

    return (
        <div
            id="page-container"
            className="h-full w-full flex flex-col md:flex-row items-center justify-center md:gap-x-6 md:px-64 py-3 px-3"
        >
            <div className="flex flex-col w-full">
                <CollapsableModalCheckout
                    callback={() => toggler}
                    title="Choose a shipping address"
                >
                    <ShippingPhase phaseHandler={phaseHandler} />
                </CollapsableModalCheckout>

                <CollapsableModalCheckout
                    startClosed={true}
                    callback={() => toggler}
                    title="Payment method"
                >
                    <PaymentPhase phaseHandler={phaseHandler} />
                </CollapsableModalCheckout>
            </div>
            <section
                id="order-summary"
                className="w-full md:w-1/3 border border-zinc-200 rounded-md p-4"
            >
                Order summary
            </section>
        </div>
    )
}

export default CheckoutPage
