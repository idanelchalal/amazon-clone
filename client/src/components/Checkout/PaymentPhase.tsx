import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../UI/Button'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'

const detailsForm = yup
    .object({
        CardNumber: yup.string().required().length(16).label('Card number'),
        Cvc: yup.string().length(3).min(1).required(),
        Date: yup
            .date()
            .required()
            .typeError('Expiration date can not be empty.'),
    })
    .required()

const PaymentPhase = ({
    phaseHandler,
}: {
    phaseHandler?: (data) => Promise<any> | any
}) => {
    const {
        register,
        handleSubmit,
        watch,

        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({ resolver: yupResolver(detailsForm) })

    const CardNumber = watch('CardNumber', '')
    const Cvc = watch('Cvc', '')
    const Date = watch('Date')
    const onSubmit = (data) => phaseHandler(data)

    return (
        <section
            id="details-form"
            className="w-full flex flex-col gap-2 transition"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <article className="w-full border border-zinc-200 rounded-md p-4 pr-[25%]">
                    <h1
                        id="add-new-address-title"
                        className="text-xl font-semibold mb-3"
                    >
                        Enter your payment method details
                    </h1>
                    <div id="payment-form" className="flex flex-col gap-2">
                        <label
                            htmlFor="card-number-input"
                            className="flex flex-row gap-x-3"
                            id="card-number-label"
                        >
                            <span>Card number: </span>
                            <input
                                disabled={isSubmitSuccessful}
                                ref={CardNumber}
                                {...register('CardNumber', {
                                    maxLength: 16,
                                    minLength: 16,
                                    max: 9999999999999999,
                                    required: true,
                                })}
                                className="border border-black rounded-md focus:bg-orange-50 focus:ring-1 focus:ring-cyan-300 p-1 text-xs"
                                type="text"
                                id="card-number-input"
                            />
                        </label>
                        {errors.CardNumber && (
                            <span className="text-red-500 text-xs font-semibold">
                                {errors.CardNumber.message}
                            </span>
                        )}

                        <label
                            htmlFor="card-date-input"
                            className="flex flex-row gap-x-3"
                            id="card-date-label"
                        >
                            <span>Expiration date:</span>
                            <input
                                disabled={isSubmitSuccessful}
                                ref={Date}
                                {...register('Date', {
                                    required: true,
                                })}
                                className="border border-black rounded-md focus:bg-orange-50 focus:ring-1 focus:ring-cyan-300 p-1 text-xs"
                                type="month"
                                id="card-date-input"
                            />
                        </label>
                        {errors.Date && (
                            <span className="text-red-500 text-xs font-semibold">
                                {errors.Date.message}
                            </span>
                        )}
                        <label
                            htmlFor="card-cvv-input"
                            className="flex flex-row gap-x-3"
                            id="card-cvv-label"
                        >
                            <span>CVC:</span>
                            <input
                                disabled={isSubmitSuccessful}
                                ref={Cvc}
                                {...register('Cvc', {
                                    maxLength: 3,
                                    minLength: 3,
                                    max: 999,
                                    min: 0,
                                    required: true,
                                })}
                                className="border border-black rounded-md focus:bg-orange-50 focus:ring-1 focus:ring-cyan-300 p-1 text-xs"
                                type="number"
                                id="card-cvv-input"
                                max={999}
                                min={1}
                            />
                        </label>
                        {errors.Cvc && (
                            <span className="text-red-500 text-xs font-semibold">
                                {errors.Cvc.message}
                            </span>
                        )}
                        <div className="w-34">
                            <Button
                                disabled={isSubmitSuccessful || isSubmitting}
                                type="submit"
                                rounded="md"
                            >
                                {(isSubmitSuccessful && (
                                    <>
                                        Added <AiOutlineCheck />
                                    </>
                                )) || <>Add payment method</>}
                            </Button>
                            {isSubmitSuccessful && (
                                <span className="text-green-700">
                                    Payment method added!
                                </span>
                            )}
                        </div>
                    </div>
                </article>
            </form>
        </section>
    )
}

export default PaymentPhase
