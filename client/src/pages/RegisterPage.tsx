import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from 'axios'
import Config from '../config'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

const schema = yup
    .object({
        Email: yup.string().required().email(),
        Password: yup.string().min(6).required(),
        PasswordVerify: yup
            .string()
            .required('Confirm password field is required.')
            .oneOf([yup.ref('Password')], 'Your passwords do not match.'),
        Name: yup.string().required().min(2),
    })
    .required()

const RegisterPage = () => {
    const [isError, setIsError] = useState<boolean>(false)
    const {
        watch,
        formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
        setError,
        register,
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) })

    const navigate = useNavigate()

    const formData = {
        password: watch('Password'),
        passwordVerify: watch('PasswordVerify'),
        name: watch('Name'),
        email: watch('Email'),
    }

    const onSubmit = async (data) => {
        if (isValid) {
            try {
                const URI = Config.SERVER_URI + '/auth/signup'
                const res = await axios.post(URI, {
                    ...data,
                })
                res.status === 201 &&
                    setTimeout(() => navigate('/auth/signin'), 2500)
            } catch (error) {
                if (error.response.data === 500) setIsError(true)

                const { path, errors }: FormError = error.response.data
                errors.forEach((err) => {
                    //@ts-ignore
                    setError(path, { message: err })
                })
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-2 mb-6">
            <div className="p-3 border border-zinc-300 rounded-md w-full md:max-w-[22rem]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                        className="p-3 flex flex-col gap-y-2"
                        id="form-container"
                    >
                        <h1 className="text-2xl font-semibold mb-2">Sign In</h1>

                        {/* YOUR FULL NAME */}
                        <label className="text-sm font-semibold" htmlFor="name">
                            Your name
                        </label>

                        <input
                            value={formData.name || ''}
                            {...register('Name')}
                            id="name"
                            className="h-8 p-2 text-xs border rounded-md focus:ring-offset-2 focus:ring-1 focus:ring-transparent ring-offset-sky-200 border-zinc-400"
                            placeholder="Your first and last name"
                        />

                        {/* EMAIL */}
                        <label
                            className="text-sm font-semibold"
                            htmlFor="email"
                        >
                            Enter your email
                        </label>

                        <input
                            value={formData.email || ''}
                            {...register('Email')}
                            id="email"
                            className="h-8 p-2 text-xs border rounded-md focus:ring-offset-2 focus:ring-1 focus:ring-transparent ring-offset-sky-200 border-zinc-400"
                            placeholder=""
                        />
                        {errors.Email && (
                            <span className="text-red-500 text-xs font-semibold">
                                {errors.Email.message}
                            </span>
                        )}
                        {/* PASSWORD */}
                        <label
                            className="text-sm font-semibold"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            value={formData.password || ''}
                            {...register('Password')}
                            id="password"
                            className="h-8 p-2 text-xs border rounded-md focus:ring-offset-2 focus:ring-1 focus:ring-transparent ring-offset-sky-200 border-zinc-400"
                            placeholder="At least 6 characters"
                        />

                        {errors.Password && (
                            <span className="text-red-500 text-xs font-semibold">
                                {errors.Password.message}
                            </span>
                        )}

                        {/* PASSWORD VALIDATION */}
                        <label
                            className="text-sm font-semibold"
                            htmlFor="verify-password"
                        >
                            Re-enter password
                        </label>
                        <input
                            value={formData.passwordVerify || ''}
                            {...register('PasswordVerify')}
                            id="verify-password"
                            className="h-8 p-2 text-xs border rounded-md focus:ring-offset-2 focus:ring-1 focus:ring-transparent ring-offset-sky-200 border-zinc-400"
                        />
                        {errors.PasswordVerify && (
                            <span className="text-red-500 text-xs font-semibold">
                                {errors.PasswordVerify.message}
                            </span>
                        )}

                        <p className="text-xs text-zinc-800 my-5">
                            By continuing, you agree to{' '}
                            <span className="hover:underline font-semibold cursor-pointer">
                                Amazon's Conditions of Use{' '}
                            </span>
                            and{' '}
                            <span className="hover:underline font-semibold cursor-pointer">
                                Privacy Notice.
                            </span>
                        </p>

                        {/* SUBMIT FORM */}
                        <button
                            disabled={isSubmitting || isError}
                            type="submit"
                            className="transition p-4 shadow-md text-xs flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded-md h-6 disabled:bg-yellow-200 disabled:cursor-not-allowed"
                        >
                            {(!isSubmitting && <>Continue</>) ||
                                (isSubmitting && !isError && (
                                    <>
                                        Registering &nbsp;
                                        <ClipLoader size={24} color="white" />
                                    </>
                                ))}
                        </button>
                        {isSubmitSuccessful && (
                            <span className="text-green-400 font-semibold">
                                Signed up successfully, redirecting...
                            </span>
                        )}
                        {isError && (
                            <span className="text-red font-semibold">
                                An error occurred! Please come back later.
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
