import axios from 'axios'

import Config from '../config'

import ClipLoader from 'react-spinners/ClipLoader'

import { useContext, useEffect, useMemo, useState } from 'react'

import ShippingPhase from '../components/Checkout/ShippingPhase'
import PaymentPhase from '../components/Checkout/PaymentPhase'

import CollapsableModalCheckout from '../components/CollapsableModalCheckout'
import { CartContext } from '../providers/CartProvider'
import Button from '../components/UI/Button'
import Address_Dropdown from '../components/Address_Dropdown'
import addAddressHandler from '../utils/addAddress'
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
    const [data, setData] = useState({
        shipping: { disabled: false, valid: false },
        payment: { disabled: false, valid: false },
    })

    const [formStatus, setFormStatus] = useState({
        error: false,
        submitting: false,
        success: false,
    })

    const navigate = useNavigate()

    const cart = useContext(CartContext)
    const [addressList, setAddressList] = useState<IAddress[] | null>(null)

    useEffect(() => {
        const getAddresses = async () => {
            return await axios.get(
                Config.SERVER_URI + '/dashboard/get-address-list',
                { withCredentials: true }
            )
        }

        const res = getAddresses()
        res.then(({ data }) => setAddressList(data)).catch((err) =>
            console.error(err)
        )
    }, [])

    const totalPrice = useMemo(() => {
        const products = cart.cart?.products
        if (!products) return
        let total = 0
        products.forEach((product) => {
            total += product.quantity * product.productId.price
        })

        return total
    }, [cart])

    const setPayment = (payload) => {
        setData((prev) => {
            return {
                ...prev,
                payment: { valid: true, ...payload },
            }
        })
    }

    const setAddress = (payload) => {
        if (!payload) return
        setData((prev) => {
            return {
                ...prev,
                shipping: { ...payload, disabled: true, valid: true },
            }
        })
    }

    const sendForm = async () => {
        setFormStatus({ error: false, submitting: true, success: false })
        if (data.payment.valid && data.shipping.valid)
            try {
                console.log(data.shipping)
                const res = await addAddressHandler({
                    country: 'Israel',
                    //@ts-ignore
                    street: data.shipping.Address || data.shipping.street,
                    //@ts-ignore
                    city: data.shipping.City || data.shipping.city,
                })

                setFormStatus({
                    error: false,
                    submitting: false,
                    success: true,
                })

                setInterval(() => navigate('/'), 3000)
            } catch (err) {
                console.error(err)
                setFormStatus({
                    submitting: false,
                    error: true,
                    success: false,
                })
            }
        else return
    }

    return (
        <div
            id="page-container"
            className="h-full w-full flex flex-col md:flex-row items-center md:gap-x-6 md:px-64 py-3 px-3"
        >
            <div className="flex flex-col w-full">
                <CollapsableModalCheckout title="Choose a shipping address">
                    <article className="flex flex-row items-center gap-2 my-2">
                        <span className="text-xs text-zinc-500">
                            or choose existing address:
                        </span>
                        <Address_Dropdown
                            addressList={addressList}
                            callback={setAddress}
                        />
                        {data?.shipping?.disabled && (
                            <span
                                className="hover:underline text-blue-700 text-xs hover:cursor-pointer"
                                onClick={() =>
                                    setData((prev) => {
                                        const shipping = prev.shipping
                                        shipping.disabled = false
                                        shipping.valid = false

                                        return {
                                            ...prev,
                                            shipping,
                                        }
                                    })
                                }
                            >
                                Edit address
                            </span>
                        )}
                    </article>
                    <ShippingPhase
                        disabled={data.shipping.disabled}
                        phaseHandler={setAddress}
                    />
                </CollapsableModalCheckout>

                <CollapsableModalCheckout
                    startClosed={true}
                    title="Payment method"
                >
                    <PaymentPhase phaseHandler={setPayment} />
                </CollapsableModalCheckout>
                <Button
                    onClick={sendForm}
                    disabled={!data.payment?.valid || !data.shipping?.valid}
                >
                    {(formStatus.submitting && (
                        <>
                            <ClipLoader size={24} color="white" /> Proccessing
                        </>
                    )) || <>Pay now!</>}
                </Button>
                {formStatus.success && (
                    <span className="text-green">
                        Thank you for purchasing!
                    </span>
                )}
            </div>
            <section
                id="order-summary"
                className="w-full md:w-1/3 border border-zinc-200 rounded-md p-4"
            >
                <p className="text-xs py-2">
                    Choose a shipping address to continue checking out. You'll
                    still have a chance to review and edit your order before
                    it's final.
                </p>
                <hr />
                <div
                    className="flex flex-col py-2 gap-y-2 w-full"
                    id="order-summary-container"
                >
                    <h1 className="text-lg font-semibold">Order summary</h1>
                    <div className="grid grid-cols-2 grid-rows-2 text-xs w-full">
                        <span>Items ({cart.itemsQty}): </span>
                        <span>${totalPrice}</span>
                        <span>Shipping & handling:</span>
                        <span> -- </span>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 text-xs w-full">
                        <span>Total before tax: </span>
                        <span>--</span>
                        <span>Estimated tax to be collected:</span>
                        <span> -- </span>
                    </div>
                    <hr />
                    <div className="grid grid-cols-2 grid-rows-1">
                        <span className="text-orange-700 font-semibold">
                            Order total:
                        </span>
                        <span>--</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CheckoutPage
