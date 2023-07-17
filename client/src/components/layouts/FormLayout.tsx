import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo_Black from '../Logo_Black'

const FormLayout = () => {
    return (
        <main id="main-container">
            <header className="p-1 w-full h-full flex items-center justify-center">
                <div className="w-24 aspect-video" id="logo-container">
                    <Logo_Black />
                </div>
            </header>
            <section
                className="flex items-center justify-center"
                id="form-section-container"
            >
                <Outlet />
            </section>
            <hr className="w-full p-0 m-0" />
            <footer className="bg-[#FFFFFF] w-full flex flex-col items-center mt-4 gap-y-2">
                <ul className="list-none flex flex-row gap-x-3 text-xs text-zinc-700">
                    {[' Conditions of Use', 'Privacy Notice', 'Help'].map(
                        (opt) => (
                            <li key={opt}>{opt}</li>
                        )
                    )}
                </ul>
                <p className="text-zinc-700 text-xs">
                    © 1996-2023, Amazon.com, Inc. or its affiliates
                </p>
            </footer>
        </main>
    )
}

export default FormLayout
