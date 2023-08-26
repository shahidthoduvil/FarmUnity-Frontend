import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import profilePicture from '../../images/images.jpg';
import profileBackground from '../../images/try.jpg';
import { Rating } from "@material-tailwind/react";
import Slide2 from './Slide2'
import axios from 'axios';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { BASE_URL } from '../../utils/config';

const UserProfile = () => {
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


  const [isFollowing, setIsFollowing] = useState(false);

  


  useEffect(() => {

    getUser();
  }, []);


  const [username, setUsername] = useState('');
  const { usernam } = useParams()





  async function getUser() {
    try {
      const response = await axios.get(`${BASE_URL}/home/getuserinfo/${usernam}/`)
      setUser(response.data.user);
      setOccupation(response.data.user_occupation);
      setAddress(response.data.user_address);
      setCategory(response.data.category);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function checkFollowStatus() {
      try {
        const response = await axios.get(`${BASE_URL}/post/follow/${user_id}/${user.id}/`);
        setIsFollowing(response.data.is_followed);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    }

    checkFollowStatus();
    getUser();
  }, []);


  const callSetFollowed = (user1, user2, setFollowed) => {
    axios.get(`follow/${user1}/${user2}/`).then((response) => {
        console.log('UserFollow :> ',response);
        if (response.data.is_followed == true) {
            setFollowed(true)
        }
    })
}


  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`${BASE_URL}/post/follow/${user_id}/${user.id}/`);
      } else {
        await axios.post(`${BASE_URL}/post/follow/${user_id}/${user.id}/`);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };


  return (
    <div className="min-h-screen">
      <div className="relative bg-cover bg-center h-72 md:h-96" style={{ backgroundImage: `url(${BASE_URL + user.cover})` }}>
        <div className="p-16">
          <div className="p-8 bg-[#ffffffe1] rounded-3xl shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div className="flex items-center gap-2">
                  {/* <Rating /> */}
                </div>
                <button
                  className={`px-4 py-2 rounded-full text-white ${isFollowing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  onClick={toggleFollow}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                {}


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

        <div className="mt-28 text-center border-b pb-12 ">
          <h1 className="text-4xl font-medium text-gray-700 mt-4">{user?.username}</h1>
          <p className="font-light text-gray-600 mt-3">{Address?.city}</p>
          <p className="mt-8 text-gray-500">{category}</p>
          <p className="mt-2 text-gray-500">{occupation?.titile}</p>
          <p className="mt-2 text-gray-900">{isUserOnline()}</p>



        </div>
        <div className="flex items-center justify-center mt-10">
          <Slide2 usernam={usernam} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
