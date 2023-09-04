import React from 'react';
import UserMenu from '../Profile/UserMenu';
import Notification from './Notification';
import { getLocal } from "../../helpers/auth";
import img from '../../images/farm-community-high-resolution/farm-community-high-resolution-logo-black-on-transparent-background.png'

function Navbar() {
    const localResponse = getLocal('authToken');
    
    return (
        <nav className="bg-[#788F69]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex items-center flex-shrink-0">
                        <img
                            src={img} // Update with the actual path to your logo image
                            alt="Farm Community Logo"
                            className="h-6 w-32" // Adjust the height and width as needed
                        />
                    </div>
                    <div className="flex-1 flex justify-between sm:ml-6">
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-white rounded-md px-3 py-2 w- text-sm font-medium hover:bg-blue-gray-800 focus:-outline-offset-8"
                                aria-current="page"
                            >
                                <svg
                                    class="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    {/* SVG Path */}
                                </svg>
                            </a>
                        </div>
                        <div className="flex items-center sm:ml-6">
                            {localResponse ? 
                                   <Notification />
                             :' '
                            }
                            <UserMenu />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
