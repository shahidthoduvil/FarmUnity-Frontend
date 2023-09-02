import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

  const navigate=useNavigate()
 


  const isUserOnline = () => {
    return user?.is_active ? "Online" : "Offline";
  };


  

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [username, setUsername] = useState('');
  const { usernam } = useParams()

  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (decoded.is_admin==true) {
        navigate('/adm')
      }
    }
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(`${BASE_URL}/home/getuserinfo/${usernam}/`)
      setUser(response.data.user);
      setOccupation(response.data.user_occupation);
      setAddress(response.data.user_address);
      setCategory(response.data.category);
      callSetFollowed(user_id, response.data.user.id);
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    getUser();
  }, []);




  //   const callSetFollowed = () => {
  //     axios.get(`${BASE_URL}/post/follow/${user_id}/${user.id}/`).then((response) => {
  //         console.log('UserFollow :> ',response);
  //         if (response.data.is_followed == true) {
  //           setIsFollowing(true)
  //         }

  //     })
  // }


  const callSetFollowed = (user1 = user_id, user2 = user.id) => {
    console.log('Hello kootukaaare.....', user1, user2);
    axios.get(`${BASE_URL}/post/follow/${user1}/${user2}/`)
      .then((response) => {
        console.log(response, 'respone>>>>>>.');
        if (response.data.is_followed === true) {
          setIsFollowing(true);
        }
        setFollowerCount(response.data.follower_count);
        setFollowingCount(response.data.following_count);
      })
      .catch((error) => {
        console.error('Error checking follow status:', error);
      });
  };


  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`${BASE_URL}/post/follow/${user_id}/${user.id}/`);
      } else {
        await axios.post(`${BASE_URL}/post/follow/${user_id}/${user.id}/`);
      }
      setIsFollowing(!isFollowing);
      setFollowerCount(prevFollowerCount => (isFollowing ? prevFollowerCount - 1 : prevFollowerCount + 1));

    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };


  return (
    <div className="min-h-screen">
      <div className="relative bg-cover bg-center h-72 md:h-96" style={{ backgroundImage: `url(${BASE_URL + user.cover})` }}>
        <div className="p-4 md:p-16"> 
          <div className="p-4 md:p-8 bg-[#ffffffe1] rounded-3xl shadow mt-8 md:mt-24"> 
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center md:order-first mt-4 md:mt-0"> 
                <div className="flex items-center gap-2">
                 
                </div>
                <button
                  className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-white ${isFollowing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  onClick={toggleFollow}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              
              </div>
              <div className="relative">
                <div className="w-24 h-24 md:w-48 md:h-48 bg-[#788F69] mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-8 md:-mt-24 flex items-center justify-center text-indigo-500">
                  {user?.pic ? (
                    <img src={BASE_URL + user.pic} alt="Profile Image" className="w-20 h-20 md:w-40 md:h-40 rounded-full" />
                  ) : (
                    <img src={profilePicture} alt="Profile Image" className="w-20 h-20 md:w-40 md:h-40 rounded-full" />
                  )}
                </div>
              </div>
            </div>
            <p className="md:mt-2">Followers: {followerCount}</p>
            
            <p className="md:mt-2">Following: {followingCount}</p>
          </div>

        </div>

        <div className="mt-4 md:mt-8 text-center border-b pb-4 md:pb-12 "> {/* Adjust margin and padding for smaller screens */}
          <h1 className="text-xl md:text-4xl font-medium text-gray-700 mt-2 md:mt-4">{user?.username}</h1> {/* Adjust font size for smaller screens */}
          <p className="font-light text-gray-600 mt-1 md:mt-3">{Address?.city}</p> {/* Adjust margin for smaller screens */}
          <p className="mt-4 md:mt-6 text-gray-500">{category}</p> {/* Adjust margin for smaller screens */}
          <p className="mt-1 md:mt-2 text-gray-500">{occupation?.titile}</p> {/* Adjust margin for smaller screens */}
          <p className="mt-1 md:mt-2 text-gray-900">{isUserOnline()}</p> {/* Adjust margin for smaller screens */}
        </div>
        <div className="flex items-center justify-center mt-6 md:mt-10"> {/* Adjust margin for smaller screens */}
          <Slide2 usernam={usernam} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
