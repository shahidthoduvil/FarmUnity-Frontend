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
                        src={img} 
                        alt="Farm Community Logo"
                        className="h-5 w-32" 
                    />
                </div>
                <div className="">
                    {localResponse ? (
                        <div className="flex items-center">
                            <Notification />
                            <UserMenu />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;
