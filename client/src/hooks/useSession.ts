import axios from 'axios'
import { useEffect, useState } from 'react'
import Config from '../config'

const useSession = () => {
    const [session, setSession] = useState(null)

    const abortSession = async () => {
        if (!session) return
        await axios
            .delete(Config.SERVER_URI + '/auth/session', {
                withCredentials: true,
            })
            .catch((err) => console.error(err))
            .then(() => {
                window.location.href = '/'
            })
    }

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const validateSession = async () => {
            try {
                const res = await axios.get(
                    Config.SERVER_URI + '/auth/session',
                    {
                        withCredentials: true,
                        signal: controller.signal,
                    }
                )
                const { data: session } = res
                setSession(session)
            } catch (err) {
                const { data } = err.response
                data === 'INVALID_SESSION' && setSession(null)
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
