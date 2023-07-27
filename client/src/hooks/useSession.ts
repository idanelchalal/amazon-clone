import axios from 'axios'
import { useEffect, useState } from 'react'
import Config from '../config'

const useSession = () => {
    const [session, setSession] = useState<{
        status: 'disconnected' | 'loading' | 'success'
    }>({ status: 'loading' })

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
                const { data } = err.response
                data === 'INVALID_SESSION' &&
                    setSession({ status: 'disconnected' })
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
