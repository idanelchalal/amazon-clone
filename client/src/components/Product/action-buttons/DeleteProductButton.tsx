import { FC, useCallback } from 'react'

interface ActionButton {
    fn?: () => void
    value?: string
}

const DeleteProductButton: FC<ActionButton> = ({ fn, value }) => {
    const callbackFn = useCallback(() => fn(), [fn])

    return (
        <span
            className="hover:cursor-pointer text-cyan-700 hover:underline"
            onClick={() => callbackFn()}
        >
            {value}
        </span>
    )
}

export default DeleteProductButton
