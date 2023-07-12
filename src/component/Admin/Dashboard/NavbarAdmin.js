import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../../Profile/UserMenu';
import ProfileDropdown from './ProfileDropdown';

const NavbarAdmin = () => {
    const [showDropdown, setShowDropdown] = useState(false);
  
    const handleToggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  
  
  
    return (
      <div className="bg-white  text-white h-16 flex items-center px-4 shadow-xl">
        <Link to="/adm" className="text-[#788F69] text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 inline-block mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </Link>
        <div className="flex-grow"></div>
  
        <div className="ml-4">
          <ProfileDropdown/>
        </div>
      </div>
    );
  };

export default NavbarAdmin;
