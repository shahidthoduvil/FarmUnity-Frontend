import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileBackground from '../../images/py.jpg'; // Replace with your background image
import profilePicture from '../../images/try.jpg'; // Replace with your profile picture

const ProfilePage = () => {


  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Profile header */}
      <div className="relative bg-cover bg-center h-72 md:h-96" style={{ backgroundImage: `url(${profileBackground})` }}>
        <div class="p-16">
          <div class="p-8 bg-white shadow mt-24">
            <div class="grid grid-cols-1 md:grid-cols-3">
              <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12.585l3.879 2.338a1 1 0 001.447-1.056l-.93-4.927 3.312-3.032a1 1 0 00-.554-1.705l-4.61-.398L10.83 1.32a1 1 0 00-1.66 0L6.536 3.642l-4.61.398a1 1 0 00-.555 1.705l3.312 3.032-.93 4.927a1 1 0 001.447 1.056L10 12.585z" />
                  </svg>

                  <p className="text-gray-400">Rating</p>
                </div>
              </div>
              <div class="relative">
                <div class="w-48 h-48 bg-[#788F69] mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  <img src={profilePicture} alt="Profile Image" class="w-40 h-40 rounded-full" />
                </div>
              </div>

              <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">

                <button
                  class="text-white py-2 px-4 uppercase rounded-2xl bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Edit profile
                </button>
              </div>
            </div>

            <div class="mt-20 text-center border-b pb-12">
              <h1 class="text-4xl font-medium text-gray-700">Vishnu K <span class="font-light text-gray-500"></span></h1>
              <p class="font-light text-gray-600 mt-3">Palakkad,allanallur</p>

              <p class="mt-8 text-gray-500">Farmer</p>
              <p class="mt-2 text-gray-500">Horiculture</p>
            </div>

            <div class="mt-12 flex flex-col justify-center">

              <button
                class="text-indigo-500 py-2 px-4  font-medium mt-4"
              >
                Show more
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
