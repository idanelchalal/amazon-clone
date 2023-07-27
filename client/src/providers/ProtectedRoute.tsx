import { Navigate } from 'react-router-dom'
import LoadingPage from '../pages/LoadingPage'

const ProtectedRoute = ({
    children,
    fallback = '/',
    session,
    callback,
}: {
    children?: React.ReactNode
    fallback?: string
    session: any
    callback?: () => void
}) => {
    if (session && session.status === 'loading') return <LoadingPage />
    if (session && session.status === 'disconnected') {
        if (callback) callback()
        return <Navigate to={fallback} replace />
    }
    if (session && session.status === 'success') return children
}

export default ProtectedRoute
