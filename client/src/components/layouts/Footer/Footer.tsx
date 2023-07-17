import React from 'react'
import ListsComponent from './ListsComponent'
import Logo from '../../Logo'

const Footer = () => {
    return (
        <>
            <footer id="main-footer-container" className="w-full  text-white">
                <div id="links-to">
                    <a href="#main-nav">
                        <div className="w-full bg-[#37475A]/100 hover:bg-[#37475A]/95 cursor-pointer p-4 text-center text-xs font-semibold text-white">
                            Back to Top
                        </div>
                    </a>
                    <div
                        className="bg-secondary-navy py-4 md:px-[16%] flex flex-col gap-y-16 items-center md:items-start md:flex-row md:gap-x-32 "
                        id="upper-footer"
                    >
                        <ListsComponent
                            options={[
                                'Careers',
                                'Blog',
                                'About Amazon',
                                'Investor Relations',
                                'Amazon Devices',
                                'Amazon Science',
                            ]}
                            title="Get to Know Us"
                            id="get-to-know-us"
                        />

                        <ListsComponent
                            title="Make Money with Us"
                            options={[
                                'Sell products on Amazon',
                                'Sell on Amazon Business',
                                'Sell apps on Amazon',
                                'Become an Affiliate',
                                'Advertise Your Products',
                                'Self-Publish with Us',
                                'Host an Amazon Hub',
                                '› See More Make Money with Us',
                            ]}
                            id="make-money-with-us"
                        />

                        <ListsComponent
                            title="Amazon Payment Products"
                            options={[
                                'Amazon Business Card',
                                'Shop with Points',
                                'Reload Your Balance',
                                'Amazon Currency Converter',
                            ]}
                            id="amazon-payment-products"
                        />

                        <ListsComponent
                            title="Let Us Help You"
                            options={[
                                'Amazon and COVID-19',
                                'Your Account',
                                'Your Orders',
                                'Shipping Rates & Policies',
                                'Returns & Replacements',
                                'Manage Your Content and Devices',
                                'Amazon Assistant',
                                'Help',
                            ]}
                            id="let-us-help-you"
                        />
                    </div>
                    <hr className="border-b-1 border-[#2C3746]" />
                    <div className="flex items-center justify-center bg-secondary-navy p-4 gap-x-10">
                        <div className="w-28 aspect-video">
                            <Logo />
                        </div>
                        <div className="flex flex-row gap-x-2 items-center">
                            <select className="p-2 bg-transparent text-white text-xs border-zinc-500 border rounded-sm">
                                <option value={'english'}>English</option>
                                <option value={'Russian'}>Russian</option>
                                <option value={'Spanish'}>Spanish</option>
                                <option value={'Hebrew'}>Hebrew</option>
                            </select>

                            <select className="p-2 bg-transparent text-white text-xs border-zinc-500 border rounded-sm">
                                <option value={'usd'}>
                                    USD - United States Dollar
                                </option>
                                <option value={'nis'}>
                                    NIS - New Israeli Shekel
                                </option>
                                <option value={'euro'}>EUR - Euro</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div
                    className=" bg-main-navy min-h-[30vh] grid grid-cols-6 gap-y-3 py-12 md:px-[16%]"
                    id="bottom-footer"
                >
                    {[
                        'Amazon Music Stream millions of songs',
                        'Amazon Advertising Find, attract, and engage customers',
                        '6pm Score deals on fashion brands',
                        'AbeBooks Books, art & collectibles ACX Audiobook Publishing Made Easy',
                        'Sell on Amazon Start a Selling Account',
                        'Amazon Business Everything For Your Business',
                        'AmazonGlobal Ship Orders Internationally',
                        'Home Services Experienced Pros Happiness Guarantee',
                        'Amazon Ignite Sell your original Digital Educational Resources',
                        'Amazon Web Services Scalable Cloud Computing Services',
                        'Audible Listen to Books & Original Audio Performances',
                        'Book Depository Books With Free Delivery Worldwide',
                        'Box Office Mojo Find Movie Box Office Data',
                        'ComiXology Thousands of Digital Comics',
                        'DPReview Digital Photography',
                        'Fabric Sewing, Quilting & Knitting',
                        'Goodreads Book reviews & recommendations',
                        'IMDb Movies, TV & Celebrities',
                        'IMDbPro Get Info Entertainment Professionals Need',
                        'Kindle Direct Publishing Indie Digital & Print Publishing Made Easy',
                        'Prime Video Direct Video Distribution Made Easy',
                        'Shopbop Designer Fashion Brands',
                        'Woot! Deals and Shenanigans',
                        'Zappos Shoes & Clothing',
                        'Ring Smart Home Security Systems',
                        'eero WiFi Stream 4K Video in Every Room',
                        'Blink Smart Security for Every Home',
                        'Neighbors App Real-Time Crime & Safety Alerts',
                        'Amazon Subscription Boxes Top subscription boxes – right to your door',
                        'PillPack Pharmacy Simplified',
                    ].map((option) => (
                        <span className="text-xs text-zinc-400 w-32">
                            {option}
                        </span>
                    ))}
                </div>
                <div className="bg-main-navy flex flex-col items-center text-xs text-zinc-300 gap-y-1">
                    <ul className="list-none space-x-6 ">
                        {[
                            'Conditions of Use',
                            'Privacy',
                            'Notice Your Ads',
                            'Privacy',
                        ].map((option) => (
                            <span>{option}</span>
                        ))}
                    </ul>
                    <p className="pb-8">
                        Choices © 1996-2023, Amazon.com, Inc. or its affiliates
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer
