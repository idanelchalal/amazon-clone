import { memo } from 'react'
import { BounceLoader } from 'react-spinners'

const LoadingPage = memo(() => {
    return (
        <article className="h-screen w-screen flex items-center justify-center">
            <BounceLoader color="#ffb900" size="200px" />
        </article>
    )
})

export default LoadingPage
