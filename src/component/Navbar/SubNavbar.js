import React from 'react';
import { Link } from 'react-router-dom';

const SubNavbar = () => {




  return (
    <div class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex py-2 overflow-x-auto no-scrollbar overflow-y-auto">
          <div class="flex w-full space-x-4">
            <Link to='/'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap  transition-transform transform hover:scale-110 active:scale-100">Home</p></Link>

            <Link to='/post'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Post</p></Link>

            <Link><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]   hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">News</p></Link>

            <Link><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Solution</p></Link>

            <Link><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Farmers</p></Link>

            <Link><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100" >Employees</p></Link>

            <Link><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Merchants</p></Link>

            <Link><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Fertilizers</p></Link>

            <Link><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]   hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Equipments</p></Link>

            <Link><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Professionals</p>
            </Link>
          </div>
        </div>
      </div>
    </div>


  );
};

export default SubNavbar;
