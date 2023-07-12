import React from 'react'

const categories = [
    'Food',
    'Games',
    'Sport',
    'Cars',
    'Clothes',
    'Makeup',
    'Bundles',
    'Electronics',
    'Gift cards',
]

const Dropdown = ({ setCategory, setIsOpen }) => {
    const pickCategory = (option) => {
        setCategory(option)
        setIsOpen(false)
    }

    return (
        <div className="mt-1 w-64 bg-white border border-gray-300 rounded-md text-black text-base ">
            <ul className="flex flex-col w-full overflow-y-scroll overflow-x-hidden max-h-48">
                {categories.map((option) => (
                    <li
                        key={option}
                        onClick={() => pickCategory(option)}
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
