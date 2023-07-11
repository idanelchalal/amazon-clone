import { BiSolidDownArrow } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
const SearchInput = () => {
    return (
        <div className="w-full h-full flex">
            <button className="text-xs px-3 text-gray-700 outline-none hover:bg-gray-300 bg-gray-200 border border-gray-300 flex justify-center items-center gap-x-2 rounded-l-md">
                All
                <BiSolidDownArrow className="text-xs" />
            </button>
            <input
                type="search"
                maxLength={25}
                placeholder="Search Amazon"
                className="text-black p-3 w-full h-11  outline-blue-500 focus:outline-2 ring-0"
            />
            <button className="text-xs px-3 text-gray-700 outline-none hover:bg-blue-600 bg-cyan-400 flex justify-center items-center gap-x-2 rounded-r-md">
                <AiOutlineSearch className="text-2xl" />
            </button>
        </div>
    )
}

export default SearchInput
