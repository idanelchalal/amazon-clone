import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonProvider = ({ children }: { children?: React.ReactNode }) => {
    return (
        <SkeletonTheme
            borderRadius={2}
            baseColor="#d4d4d4"
            highlightColor="#ededed"
        >
            {children}
        </SkeletonTheme>
    )
}

export default SkeletonProvider
