import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import axios from 'axios'

import Config from '../config'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import ClipLoader from 'react-spinners/ClipLoader'

const schema = yup
    .object({
        Email: yup.string().required().email(),
        Password: yup.string().required(),
    })
    .required()

const LoginPage = ({}) => {
    const {
        handleSubmit,
        watch,
        register,
        reset,
        formState: { errors, isValid, isSubmitting },
        clearErrors,
        setError,
    } = useForm({ resolver: yupResolver(schema) })

    const email = watch('Email')
    const password = watch('Password')

    const [stage, setStage] = useState(1)

    const onSubmit = async (data) => {
        if (stage === 2 && isValid) {
            // Every call that enters this block is clean
            try {
                const res = await axios.post(
                    Config.SERVER_URI + '/auth/session',
                    data,
                    {
                        withCredentials: true,
                    }
                )

                if (res.status === 201) {
                    // Session created
                    window.location.href = '/'
                }
            } catch (error) {
                const { errors, path } = error.response.data

                errors.forEach((error) => {
                    //@ts-ignore
                    setError(path, {
                        message: error,
                        type: 'validate',
                    })
                })
            }
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
                            {stage === 1 && <>Your email</>}
                            {stage === 2 && email}
                        </label>
                        {errors.Email && (
                            <>
                                <span className="text-red-500 text-xs font-semibold">
                                    {errors.Email.message}
                                </span>
                                <span
                                    onClick={() => {
                                        reset()
                                        setStage(1)
                                    }}
                                    className="text-xs hover:underline hover:cursor-pointer font-semibold"
                                >
                                    Change email
                                </span>
                            </>
                        )}
                        {stage === 1 && (
                            <>
                                <input
                                    id="email"
                                    name="Email"
                                    className="h-8 p-2 text-xs border rounded-md focus:ring-offset-2 focus:ring-1 focus:ring-transparent ring-offset-sky-200 border-zinc-400"
                                    {...register('Email')}
                                    value={email || ''}
                                />
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

                        {/* SUBMIT FORM */}
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="transition p-4 shadow-md text-xs flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded-md h-6 disabled:bg-yellow-200 disabled:cursor-not-allowed"
                        >
                            {(!isSubmitting && <>Continue</>) ||
                                (isSubmitting && (
                                    <>
                                        Processing &nbsp;
                                        <ClipLoader size={24} color="white" />
                                    </>
                                ))}
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
