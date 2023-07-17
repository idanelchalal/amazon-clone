import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup
    .object({
        Email: yup.string().required().email(),
        Password: yup.string().required(),
    })
    .required()

const LoginPage = () => {
    const {
        handleSubmit,
        watch,
        register,
        resetField,
        formState: { errors, isValid },
        clearErrors,
    } = useForm({ resolver: yupResolver(schema) })

    const email = watch('Email')
    const password = watch('Password')

    const [stage, setStage] = useState(1)

    const onSubmit = (data) => {
        if (stage === 2 && isValid) {
            // TYPE DOWN THE CODE YOU WANT TO IMPLEMENT AS A LOGIN
        }
    }
    const procceedStageIfValid = (data) => {
        // If the email field isn't appearing on the errors list
        if (stage === 1 && !data.Email) {
            setStage(2)
            clearErrors()
            return
        }
    }

    return (
        <div className="flex flex-col gap-y-2">
            <div className="p-3 border border-zinc-300 rounded-md w-full md:max-w-[22rem]">
                <form onSubmit={handleSubmit(onSubmit, procceedStageIfValid)}>
                    <div
                        className="p-3 flex flex-col gap-y-3"
                        id="form-container"
                    >
                        <h1 className="text-2xl font-semibold mb-2">Sign In</h1>
                        <label
                            className="text-sm font-semibold"
                            htmlFor="email"
                        >
                            {stage === 1 && <>Email or mobile phone number</>}
                            {stage === 2 && email}
                        </label>
                        {stage === 1 && (
                            <>
                                <input
                                    id="email"
                                    name="Email"
                                    className="h-8 p-2 text-xs border rounded-md focus:ring-offset-2 focus:ring-1 focus:ring-transparent ring-offset-sky-200 border-zinc-400"
                                    {...register('Email')}
                                    value={email || ''}
                                />
                                {errors.Email && (
                                    <span className="text-red-500 text-xs font-semibold">
                                        {errors.Email.message}
                                    </span>
                                )}
                            </>
                        )}

                        {stage === 2 && (
                            <>
                                <input
                                    id="password"
                                    name="Password"
                                    className="h-8 p-2 text-xs border rounded-md focus:ring-offset-2 focus:ring-1 focus:ring-transparent ring-offset-sky-200 border-zinc-400"
                                    {...register('Password')}
                                    value={password || ''}
                                />
                                {errors.Password && (
                                    <span className="text-red-500 text-xs font-semibold">
                                        {errors.Password.message}
                                    </span>
                                )}
                            </>
                        )}
                        <button
                            type="submit"
                            className="transition p-4 shadow-md text-xs flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded-md h-6"
                        >
                            Continue
                        </button>
                        <p className="text-xs text-zinc-800">
                            By continuing, you agree to{' '}
                            <span className="hover:underline font-semibold cursor-pointer">
                                Amazon's Conditions of Use{' '}
                            </span>
                            and{' '}
                            <span className="hover:underline font-semibold cursor-pointer">
                                Privacy Notice.
                            </span>
                        </p>
                    </div>
                </form>
            </div>
            <fieldset className="border text-center border-b-0 border-x-0 flex flex-col gap-y-1 py-2 mb-6">
                <legend className="p-2 text-xs text-zinc-600">
                    New to Amazon?
                </legend>
                <Link
                    to={'../signup'}
                    className="transition p-4 shadow-md text-xs flex items-center justify-center border border-zinc-300 bg-white hover:bg-zinc-100 rounded-md h-6"
                >
                    Create your Amazon account
                </Link>
            </fieldset>
        </div>
    )
}

export default LoginPage
