import { BiSolidDownArrow } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'

import { useState } from 'react'
import Dropdown from '../Dropdown'

const SearchInput = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [category, setCategory] = useState(null)

    return (
        <>
            <div className="w-full h-full flex">
                <button
                    onClick={() => setIsOpen((prevState) => !prevState)}
                    className="text-xs px-3 text-gray-700 outline-none hover:bg-gray-300 bg-gray-200 border border-gray-300 flex justify-center items-center gap-x-2 rounded-l-md"
                >
                    {category ? category : 'All'}
                    <BiSolidDownArrow className="text-xs" />
                </button>
                <input
                    onFocus={() => setIsOpen(false)}
                    type="search"
                    maxLength={25}
                    placeholder="Search Amazon"
                    className="text-black p-3 w-full h-11  outline-blue-500 focus:outline-2 ring-0"
                />
                <button className="text-xs px-3 text-gray-700 outline-none hover:bg-blue-600 bg-cyan-400 flex justify-center items-center gap-x-2 rounded-r-md">
                    <AiOutlineSearch className="text-2xl" />
                </button>
            </div>
            <div id="dropdown-container-nav" className="absolute">
                {isOpen && (
                    <Dropdown setIsOpen={setIsOpen} setCategory={setCategory} />
                )}
            </div>
        </>
    )
}

export default SearchInput
