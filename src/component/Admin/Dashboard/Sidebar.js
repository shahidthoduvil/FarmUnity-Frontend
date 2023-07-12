import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-white text-gray-800 w-full sm:w-64 flex-none flex flex-col rounded-lg shadow-md  h-screen">
        <div className="p-4">
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <ul className="flex-grow group">
          <li className="p-4">
            <a
              href="#"
              className="block rounded-lg shadow-md px-4 py-2 transition duration-300 focus:outline-none focus:ring 
              focus:ring-[#788F69] group-hover:text-black active:bg-[#788F69] active:text-black"
            >
              Dashboard
            </a>
          </li>
          <li className="p-4">
            <a
              href="/adm/user-list"
              className="block rounded-lg shadow-md px-4 py-2 transition duration-300 focus:outline-none focus:ring
                focus:ring-[#788F69] group-hover:text-black active:bg-[#788F69] active:text-black"
              >
                Users
              </a>
          </li>
          <li className="p-4">
            <a
              href="#"
              className="block rounded-lg shadow-md px-4 py-2 transition duration-300 focus:outline-none focus:ring 
              focus:ring-[#788F69] group-hover:text-black active:bg-[#788F69] active:text-black"
            >
              Banner
            </a>
          </li>
          <li className="p-4">
            <a
              href="#"
              className="block rounded-lg shadow-md px-4 py-2 transition duration-300 focus:outline-none focus:ring 
              focus:ring-[#788F69] group-hover:text-black active:bg-[#788F69] active:text-black"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>
    );
};

export default Sidebar;
