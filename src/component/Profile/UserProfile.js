import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../../images/images.jpg'; 
import profileBackground from '../../images/try.jpg'; 
import { Rating } from "@material-tailwind/react";
import Slide2 from './Slide2'
import axios from 'axios';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { BASE_URL } from '../../utils/config';

const UserProfile= () => {
  const [rated, setRated] = React.useState(4);
  const [user, setUser] = useState({});
  const [occupation, setOccupation] = useState({});
  const [Address, setAddress] = useState({});
  const [category, setCategory] = useState('');

  const token = getLocal();
  const { user_id } = jwtDecode(token);

  const isUserOnline = () => {
    return user?.is_active ? "Online" : "Offline";
  };

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(`${BASE_URL}/api/getuserdetails/${user_id}/`)
      setUser(response.data.user);
      setOccupation(response.data.user_occupation);
      setAddress(response.data.user_address);
      setCategory(response.data.category);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="relative bg-cover bg-center h-72 md:h-96" style={{ backgroundImage: `url(${BASE_URL + user.cover})` }}>
        <div className="p-16">
          <div className="p-8 bg-[#ffffffe1] rounded-3xl shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div className="flex items-center gap-2">
                  <Rating />
                </div>
              </div>
              <div className="relative">
                <div className="w-48 h-48 bg-[#788F69] mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  {user?.pic ? (
                    <img src={`${BASE_URL}/${user.pic}`} alt="Profile Image" className="w-40 h-40 rounded-full" />
                  ) : (
                    <img src={profilePicture} alt="Profile Image" className="w-40 h-40 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">{user?.username}</h1>
          <p className="font-light text-gray-600 mt-3">{Address?.city}</p>
          <p className="mt-8 text-gray-500">{category}</p>
          <p className="mt-2 text-gray-500">{occupation?.titile}</p>
          <p className="mt-2 text-gray-900">{isUserOnline()}</p>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Slide2 />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
