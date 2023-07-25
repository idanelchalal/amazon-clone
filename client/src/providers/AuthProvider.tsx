import { createContext } from 'react'
import useSession from '../hooks/useSession'

export const AuthContext = createContext({ session: null, abortSession: null })

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const session = useSession()
    return (
        <AuthContext.Provider value={{ ...session }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
