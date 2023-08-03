import axios from 'axios'
import { useEffect, useState } from 'react'
import Config from '../config'

export interface ISession {
    userId?: string
    status?: 'disconnected' | 'loading' | 'success'
}

const useSession = () => {
    const [session, setSession] = useState<ISession>({ status: 'loading' })

    const abortSession = async (callback) => {
        if (!session) return
        await axios
            .delete(Config.SERVER_URI + '/auth/session', {
                withCredentials: true,
            })
            .catch((err) => console.error(err))
            .then(() => {
                setSession({ status: 'disconnected' })
                if (callback) callback()
            })
    }

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const validateSession = async () => {
            setSession({ status: 'loading' })
            try {
                const res = await axios.get(
                    Config.SERVER_URI + '/auth/session',
                    {
                        withCredentials: true,
                        signal: controller.signal,
                    }
                )
                const { data: session } = res

                setSession({ ...session, status: 'success' })
            } catch (err) {
                const data = err?.response?.data
                err.code === 'ERR_NETWORK' && setSession({ status: 'disconnected' })
                data && data === 'INVALID_SESSION' && setSession({ status: 'disconnected' })
            }
        }

        validateSession()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    return { session, abortSession }
}

export default useSession
