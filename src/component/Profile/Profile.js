import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../../images/images.jpg'; // Replace with your background image
import profileBackground from '../../images/try.jpg'; // Replace with your profile picture
import EditProfile from '../Profile/EditProfile'
import { Rating } from "@material-tailwind/react";
import Slide from './Slide'
import axios from 'axios';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { BASE_URL } from '../../utils/config';


const ProfilePage = () => {
  const [rated, setRated] = React.useState(4);
  const [user, setUser] = useState({})
  const [occupation, setOccupation] = useState({})
  const [Address, setAddress] = useState({})
  const [category, setCategory] = useState('')

  const token = getLocal()
  const { user_id } = jwtDecode(token)

  // const formatLastLogin = (dateTimeString) => {
  //   const dateTime = new Date(dateTimeString);
  //   console.log('DateTime:', dateTime);
  
  //   const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  //   const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  
  //   const lastLoginDate = dateTime.toLocaleDateString(undefined, dateOptions);
  //   const lastLoginTime = dateTime.toLocaleTimeString(undefined, timeOptions);
  //   console.log('Formatted Date:', lastLoginDate);
  //   console.log('Formatted Time:', lastLoginTime);
  
  //   return { lastLoginDate, lastLoginTime };
  // };
  useEffect(() => {
    getUser().then(()=>{
      console.log('Its UUUU :: ',user);
    })


  }, [])

  const refreshProfile = () => {
    // Fetch updated user data after profile update
    getUser();
  };



  async function getUser() {
    try {
      const response = await axios.get(`${BASE_URL}/api/getuserdetails/${user_id}/`)
      setUser(response.data.user)
      setOccupation(response.data.user_occupation)
      setAddress(response.data.user_address)
      setCategory(response.data.category);
      console.log(response.data.category)
      console.log('vatewifhg is :', category);

    } catch (e) {
      console.log(e);
    }
  }



  return (
    <div className="min-h-screen">
      {/* Profile header */}

      <div className="relative bg-cover bg-center h-72 md:h-96">
        <div className="relative bg-cover bg-center h-72 md:h-96"  style={{ backgroundImage: `url(${BASE_URL+user.cover})` }}>



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
                    {/* Edit icon for profile picture */}
                    <EditProfile refreshProfile={refreshProfile}  id={user.id} action={getUser}/>
                    
                  </div>
                  {/* Edit icon for profile background */}

                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">{user?.username} <span class="font-light text-gray-500"></span></h1>
            <p className="font-light text-gray-600 mt-3">{Address?.city}</p>

            <p className="mt-8 text-gray-500">{category}</p>
            <p className="mt-2 text-gray-500">{occupation?.titile}</p>
            {/* <p className="mt-2 text-gray-500">Last Login: {formatLastLogin(user?.last_login).lastLoginDate}</p>
             <p className="mt-2 text-gray-500">Time: {formatLastLogin(user?.last_login).lastLoginTime}</p> */}
          </div>
          <div className="flex items-center justify-center mt-10">
            <Slide />
          </div>


        </div>



      </div>

    </div>





  );
};

export default ProfilePage;
