import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import   profilePicture  from '../../images/profile-pic.jpg'; // Replace with your background image
import profileBackground from '../../images/try.jpg'; // Replace with your profile picture
import EditProfile from '../Profile/EditProfile'
import {Rating} from "@material-tailwind/react";
import Slide from './Slide'

const ProfilePage = () => {
  const [rated, setRated] = React.useState(4);


  return (
    <div className="min-h-screen">
      {/* Profile header */}
      <div className="relative bg-cover bg-center h-72 md:h-96" style={{ backgroundImage: `url(${profileBackground})` }}>
        <div class="p-16">
          <div class="p-8 bg-white shadow mt-24">
            <div class="grid grid-cols-1 md:grid-cols-3">
              <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                
                <div className="flex items-center gap-2">
              
                <Rating />
                </div>
              </div>
              <div class="relative">
                <div class="w-48 h-48 bg-[#788F69] mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  <img src={profilePicture} alt="Profile Image" class="w-40 h-40 rounded-full" />
                </div>
              </div>

              <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <EditProfile />
              </div>
            </div>

            <div class="mt-20 text-center border-b pb-12">
              <h1 class="text-4xl font-medium text-gray-700">Vishnu K <span class="font-light text-gray-500"></span></h1>
              <p class="font-light text-gray-600 mt-3">Palakkad,allanallur</p>

              <p class="mt-8 text-gray-500">Farmer</p>
              <p class="mt-2 text-gray-500">Horiculture</p>
            </div>
            <div className="flex items-center justify-center mt-10">
              <Slide />
            </div>
            

          </div>
         
      
          
        </div>
       
      </div>
     
    </div>
  );
};

export default ProfilePage;
