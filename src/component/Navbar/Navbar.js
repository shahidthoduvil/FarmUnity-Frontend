import React from 'react';
import UserMenu from '../Profile/UserMenu';

function Navbar() {
    return (
        <nav className="bg-[#788F69]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex items-center flex-shrink-0">
                        {/* Logo or Branding */}
                    </div>
                    <div className="flex-1 flex justify-between sm:ml-6">
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="bg-white text-black rounded-md px-3 py-2 text-sm font-medium  hover:bg-[#788F69]  focus:-outline-offset-8"
                                aria-current="page"
                            >
                                <svg
                                    class="h-6 w-6  hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512">

                                    <path
                                        d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                                </svg>
                            </a>
                        </div>
                        <div className="flex items-center sm:ml-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="bg-gray-200 text-gray-800 rounded-md py-1 px-3 text-sm focus:outline-none sm:w-48 md:w-64"
                                />
                                <button
                                    type="button"
                                    className="absolute right-0 top-0 mt-1 mr-2 p-1 bg-gray-200 rounded-md focus:outline-none"
                                >
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                type="button"
                                className="ml-2 rounded-full bg-white p-1 text-black hover:bg-[#788F69] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="sr-only">View notifications</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            </button>
                            <UserMenu />
                        </div>
                    </div>
                </div>
            </div>


        </nav>
    );
}

export default Navbar;
