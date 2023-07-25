const Dropdown = ({ setValue, setIsOpen, values, width = 'w-64' }) => {
    const pickValue = (option) => {
        setValue(option)
        setIsOpen(false)
    }

    return (
        <div
            className={`mt-1 bg-white border border-gray-300 rounded-md text-black text-base ${width}`}
        >
            <ul className="flex flex-col w-full overflow-y-scroll overflow-x-hidden max-h-48">
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
}

export default Dropdown
