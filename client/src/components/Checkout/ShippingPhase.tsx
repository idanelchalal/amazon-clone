import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

import { useForm } from 'react-hook-form'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { AiOutlineCheck } from 'react-icons/ai'
import addAddressHandler from '../../utils/addAddress'

const ShippingPhase = ({
    phaseHandler,
    disabled,
}: {
    phaseHandler?: (data) => Promise<any> | any
    disabled?: boolean
}) => {
    const {
        register,
        handleSubmit,
        watch,

        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({ resolver: yupResolver(detailsForm) })

    const Address = watch('Address', '')
    const FullName = watch('FullName', '')
    const PhoneNumber = watch('PhoneNumber', '')
    const City = watch('City', '')

    const onSubmit = async (data) => phaseHandler(data)

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
                    Add a new address
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                        id="form-container"
                        className="flex flex-col pr-[25%] gap-y-3"
                    >
                        <Input
                            disabled={isSubmitSuccessful || disabled}
                            ref={FullName}
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
                            disabled={isSubmitSuccessful || disabled}
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
                            disabled={isSubmitSuccessful || disabled}
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
                            disabled={isSubmitSuccessful || disabled}
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

                        <div className="w-32 flex flex-col gap-y-2">
                            <Button
                                type="submit"
                                disabled={
                                    isSubmitting ||
                                    isSubmitSuccessful ||
                                    disabled
                                }
                                rounded="md"
                                wide={true}
                            >
                                {(isSubmitting && 'Saving address...') ||
                                    (isSubmitSuccessful && (
                                        <>
                                            Address saved <AiOutlineCheck />
                                        </>
                                    )) ||
                                    'Use this address'}
                            </Button>
                            {isSubmitSuccessful && (
                                <span className="text-green-700">
                                    Address added!
                                </span>
                            )}
                        </div>
                    </div>
                </form>
            </article>
        </section>
    )
}

export default ShippingPhase
