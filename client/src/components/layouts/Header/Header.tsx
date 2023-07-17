import React from 'react'
import SecondaryMenuLink from '../../UI/SecondaryMenuLink'
import HamburgerMenu from '../../UI/HamburgerMenu'
import CartCounter from '../../CartCounter'
import { BiSolidDownArrow } from 'react-icons/bi'
import Flag from 'react-world-flags'
import SearchInput from '../../UI/SearchInput'
import { VscLocation } from 'react-icons/vsc'
import Logo from '../../Logo'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header
                id="main-nav"
                className="bg-main-navy gap-y-3 md:gap-y-0 flex-wrap md:flex-nowrap w-full flex justify-around items-center gap-x-5 text-white px-4 py-2"
            >
                <div id="logo" className="w-36 ">
                    <Logo />
                </div>
                <div
                    id="deliver-to-nav"
                    className="hidden md:block text-[12px] font-semibold text-[#c3c3c3]"
                >
                    Deliver to
                    <span className="flex  text-white">
                        <VscLocation className="text-xl" />
                        Israel
                    </span>
                </div>
                <div id="search-bar-nav" className="flex-grow relative z-30">
                    <SearchInput />
                </div>
                <div
                    id="language-picker-nav"
                    className="mx-6 gap-x-1 hidden md:block"
                >
                    <Flag code="il" />
                    <span>IL</span>
                </div>
                <div
                    id="auth-nav"
                    className="hidden md:flex md:flex-col md:gap-y-0"
                >
                    <span className="text-xs block">
                        Hello,{' '}
                        <Link className="hover:underline" to={'/auth/signin'}>
                            sign in
                        </Link>
                    </span>

                    <span className="flex items-center font-semibold text-base leading-none">
                        Account & Lists
                        <BiSolidDownArrow className="text-[8px] mx-1 text-gray-400" />
                    </span>
                </div>
                <div
                    id="returns-orders-nav"
                    className="hidden md:flex md:flex-col md:gap-y-0"
                >
                    <span className="text-xs block">Returns</span>
                    <span className="flex items-center font-semibold text-base">
                        & Orders
                    </span>
                </div>
                <div className="hidden md:block">
                    <CartCounter />
                </div>
            </header>
            <nav
                id="secondary-nav"
                className="bg-secondary-navy w-full text-white px-4 h-10"
            >
                <ul className="flex flex-row gap-x-5 items-center overflow-x-scroll text-xs md:text-base scroll-hider h-full">
                    <li id="secondary-menu-nav">
                        <div className="gap-x-1 items-center flex font-semibold">
                            <HamburgerMenu />
                            All
                        </div>
                    </li>
                    {[
                        "Today's Deals",
                        'Customer Service',
                        'Registry',
                        'Gift Cards',
                        'Sell',
                    ].map((link) => (
                        <SecondaryMenuLink key={link} to="/">
                            {link}
                        </SecondaryMenuLink>
                    ))}
                </ul>
            </nav>{' '}
        </>
    )
}

export default Header
