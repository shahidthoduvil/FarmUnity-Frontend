import React from 'react';
import UserMenu from '../Profile/UserMenu';

function Navbar() {
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex items-center flex-shrink-0">
                        {/* Logo or Branding */}
                    </div>
                    <div className="flex-1 flex justify-between sm:ml-6">
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                aria-current="page"
                            >
                                Home
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
                                    {/* Search Button Icon */}
                                </button>
                            </div>
                            <button
                                type="button"
                                className="ml-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
