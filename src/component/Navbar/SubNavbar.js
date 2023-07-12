import React, { useState } from 'react';


const SubNavbar = () => {
  return (
    <div>
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 bg-gray-800 rounded-full focus:outline-none"></button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SubNavbar;
