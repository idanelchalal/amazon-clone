import { useForm } from 'react-hook-form'

import axios from 'axios'

import Config from '../config'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import ClipLoader from 'react-spinners/ClipLoader'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import { useEffect } from 'react'

const detailsForm = yup
    .object({
        Address: yup.string().required().min(4).max(50),
        City: yup.string().required().min(2).max(25),
        FullName: yup.string().required().min(4).max(25).label('Full name'),
        PhoneNumber: yup
            .string()
            .required()
            .label('Phone number')
            .matches(
                /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/gm,
                {
                    message: 'Invalid number',
                    excludeEmptyString: false,
                }
            ),
    })
    .required()

const CheckoutPage = () => {
    const {
        register,
        handleSubmit,
        watch,

        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(detailsForm) })

    const Address = watch('Address')
    const FullName = watch('FullName')
    const PhoneNumber = watch('PhoneNumber')
    const City = watch('City')

    useEffect(() => {}, [])

    const onSubmit = async (data) => {}

    return (
        <div
            id="page-container"
            className="flex flex-col md:flex-row py-3 px-3 md:px-64 md:gap-x-6"
        >
            <section
                id="details-form"
                className="w-full md:min-h-screen flex flex-col gap-2"
            >
                <h1 className="text-orange-700 text-lg font-semibold">
                    1 Enter a new shipping address
                </h1>
                <article className="w-full border border-zinc-200 rounded-md p-4">
                    <h1 className="text-xl font-semibold mb-3">
                        Add a new address
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                            id="form-container"
                            className="flex flex-col pr-[25%] gap-y-3"
                        >
                            <Input
                                value={FullName}
                                placeholder="Full name"
                                {...register('FullName', {
                                    required: true,
                                    max: 25,
                                    min: 4,
                                })}
                                label="Full Name: "
                            />
                            {errors.FullName && (
                                <span className="text-red-500 text-xs font-semibold">
                                    {errors.FullName.message}
                                </span>
                            )}

                            <Input
                                value={PhoneNumber}
                                ref={PhoneNumber}
                                placeholder="Phone number"
                                {...register('PhoneNumber', {
                                    required: true,
                                    max: 25,
                                    min: 4,
                                })}
                                label="Phone Number: "
                            />
                            {errors.PhoneNumber && (
                                <span className="text-red-500 text-xs font-semibold">
                                    {errors.PhoneNumber.message}
                                </span>
                            )}

                            <Input
                                value={Address}
                                ref={Address}
                                placeholder="Address"
                                {...register('Address', {
                                    required: true,
                                    max: 50,
                                    min: 4,
                                })}
                                label="Address: "
                            />
                            {errors.Address && (
                                <span className="text-red-500 text-xs font-semibold">
                                    {errors.Address.message}
                                </span>
                            )}

                            <Input
                                value={City}
                                ref={City}
                                placeholder="City"
                                {...register('City', { max: 25, min: 2 })}
                                label="City: "
                            />
                            {errors.City && (
                                <span className="text-red-500 text-xs font-semibold">
                                    {errors.City.message}
                                </span>
                            )}

                            <div className="w-32">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    rounded="md"
                                    wide={true}
                                >
                                    {(isSubmitting && 'Saving address...') ||
                                        'Use this address'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </article>
            </section>

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
