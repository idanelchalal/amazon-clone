import React from 'react'
import FormLayout from '../components/layouts/FormLayout'
import { Navigate } from 'react-router-dom'
import LoadingPage from '../pages/LoadingPage'

const AuthRoutesProtector = ({ session, fallback }) => {
    return (
        <>
            {session.status === 'loading' && <LoadingPage />}
            {session.status === 'disconnected' && <FormLayout />}
            {session.status === 'success' && <Navigate to={fallback} />}
        </>
    )
}

export default AuthRoutesProtector
