import { styled, VariantProps } from '@phntms/css-components'

const Button = styled('button', {
    variants: {
        wide: {
            true: 'w-full',
        },
        background: {
            yellow: 'bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300',
            orange: 'bg-orange-400 hover:bg-orange-500 disabled:bg-orange-300',
            cyan: 'bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-300',
            blue: 'bg-blue-400 hover:bg-blue-500 disabled:bg-blue-300',
            green: 'bg-green-400 hover:bg-green-500 disabled:bg-green-300',
            red: 'bg-red-400 hover:bg-red-500 disabled:bg-red-300',
            black: 'bg-black hover:bg-zinc-800 disabled:bg-zinc-700 text-white',
        },

        disabled: {
            true: 'disabled',
        },
        rounded: {
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            full: 'rounded-full',
        },
        fontSize: {
            xs: 'text-xs',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            xxl: 'text-2xl',
            xxxl: 'text-3xl',
            xxxxl: 'text-4xl',
        },
        shadow: {
            none: 'shadow-none',
            sm: 'shadow-sm',
            md: 'shadow-md',
            lg: 'shadow-lg',
        },
        bold: {
            normal: 'font-normal',
            semibold: 'font-semibold',
        },
    },

    defaultVariants: {
        background: 'yellow',
        fontSize: 'xs',
        shadow: 'md',
    },
    css: [
        'disabled:cursor-not-allowed',
        'flex',
        'shadow-md',
        'transition',
        'items-center',
        'justify-center',
        'h-6',
        'p-4',
    ],
    passthrough: ['disabled', 'wide'],
})

export type ButtonVariants = VariantProps<typeof Button>

export default Button

// const Button: React.FC<ButtonProps> = ({ children }: ButtonProps) => {
//     return (
//         <button
//             className={
//                 'transition p-4 shadow-md text-xs flex items-center justify-center rounded-md h-6'
//             }
//         >
//             {children}
//         </button>
//     )
// }
