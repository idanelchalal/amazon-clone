import React, { useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import SkeletonProvider from '../SkeletonProvider'

const Card_MainPage_Skeleton = () => {
    return (
        <SkeletonProvider>
            <div className="grid grid-cols-3">
                <div className="bg-white max-w-[20rem] w-[20rem]">
                    <Skeleton height={200} className="mb-4" />
                    <div className="p-5">
                        <Skeleton height={26} width={200} />
                        <Skeleton
                            height={12}
                            width={60}
                            className="mb-5"
                        />{' '}
                        <p className="mb-3">
                            <Skeleton height={16} width={'80%'} />
                            <Skeleton height={16} width={'80%'} />
                            <Skeleton height={16} width={'50%'} />
                            <Skeleton height={16} width={'80%'} />
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-yellow-600"
                        >
                            Shop now
                        </a>
                    </div>
                </div>
            </div>
        </SkeletonProvider>
    )
}

export default Card_MainPage_Skeleton
