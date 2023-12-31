import React from 'react';
import { Link } from 'react-router-dom';
import FarmersPage from '../../pages/FarmersPage';


const SubNavbar = () => {




  return (
    <div class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex py-2 overflow-x-auto  overflow-y-auto">
          <Link to='/home'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap  transition-transform transform hover:scale-110 active:scale-100">Home</p></Link>

            <Link to='/home/post'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Post</p></Link>

            <Link to='/home/news'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]   hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">News</p></Link>

            <Link to='/home/solution'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Solution</p></Link>

            <Link to='/home/farmer'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Farmer</p></Link>

            <Link to='/home/Employee'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100" >Employees</p></Link>

            <Link to='/home/Merchant'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Merchants</p></Link>

            <Link to='/home/Fertilizer Dealer'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Fertilizers</p></Link>

            <Link to='/home/Rental Equipments'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]   hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Equipments</p></Link>

            <Link to='/home/Proffessional'><p class="text-sm font-medium text-black px-4 py-2 rounded-full hover:bg-[#788F69]  hover:text-white
           focus:outline-none whitespace-nowrap transition-transform transform hover:scale-110 active:scale-100">Professionals</p>
            </Link>
          </div>
        </div>
      </div>
  


  );
};

export default SubNavbar;
