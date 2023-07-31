import { forwardRef } from 'react'

const Dropdown = forwardRef<
    any,
    { setValue; setIsOpen; values; width; callback?: (ctx) => void }
>(({ setValue, setIsOpen, values, width = 'w-64', callback }, ref) => {
    const pickValue = (option) => {
        //@ts-ignore
        ref.current = option
        setValue(option)
        setIsOpen(false)
        callback && callback(option)
    }

    return (
        <div
            className={`mt-1 bg-white border border-gray-300 rounded-md text-black text-base ${width} absolute z-10`}
        >
            <ul
                className="flex flex-col w-full overflow-y-scroll overflow-x-hidden max-h-48"
                onMouseLeave={() => setIsOpen(false)}
            >
                {values.map((option) => (
                    <li
                        key={option}
                        onClick={() => pickValue(option)}
                        className="hover:bg-gray-100 px-2 cursor-pointer"
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    )
})
export default Dropdown
