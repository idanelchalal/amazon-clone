import { DetailedHTMLProps, FC, forwardRef } from 'react'

interface InputProps
    extends DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label?: string
}

const Input = forwardRef<any, InputProps>(({ label, ...props }, ref) => {
    return (
        <label htmlFor={label} className="flex flex-col w-full">
            <span className="font-semibold">{label}</span>
            <input
                {...props}
                ref={ref}
                id={label}
                type="text"
                className="h-8 p-2 text-xs border rounded-md focus:ring-offset-2 focus:ring-1 focus:ring-transparent ring-offset-sky-200 border-zinc-400"
            />
        </label>
    )
})

export default Input
