import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import EditDetails from './EditDetails';

const Details = () => {
  const [user, setUser] = useState({});
  const [occupation, setOccupation] = useState({});
  const [address, setAddress] = useState({});
  const [category, setCategory] = useState('')

  const token = getLocal();
  const { user_id } = jwtDecode(token);
  // const [isUserOnline, setIsUserOnline] = useState(false);
  const isUserOnline = () => {
    return user?.is_active ? "Online" : "Offline";
  };
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(`${BASE_URL}/api/getuserdetails/${user_id}/`);
      const { user, user_occupation, user_address } = response.data;
      setUser(user);
      setOccupation(user_occupation);
      setAddress(user_address);
      setCategory(response.data.category);
      // // Set user online status using is_user_online function
      // const userOnlineStatus = checkUserOnline(user.is_active, user.last_login);
      // setIsUserOnline(userOnlineStatus);
    } catch (error) {
      console.log(error);
    }
  }
  

  // Function to determine user online status
  // const checkUserOnline = (isActive, lastLogin) => {
  //   if (isActive && lastLogin) {
  //     const now = new Date();
  //     const lastActiveThreshold = new Date(lastLogin);
  //     lastActiveThreshold.setMinutes(lastActiveThreshold.getMinutes() + 5); // Adding 5 minutes to lastLogin
  //     return now <= lastActiveThreshold; // Return true if the current time is within 5 minutes of lastLogin
  //   }
  //   return false;
  // };


  return (
    <div className="p-4 md:w-1/2 mx-auto">
      {/* Heading: Address Details */}
      <h2 className="text-2xl font-bold mb-4 text-center">Address Details</h2>

      <div className="mb-4">
        <label htmlFor="username" className="font-bold">
          Username:
        </label>
        <p className="mt-2 text-gray-500">{user?.username}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="font-bold">
          Email:
        </label>
        <p className="mt-2">{user?.email}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="font-bold">
          Phone:
        </label>
        <p className="mt-2">{user?.phone_number}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="font-bold">
          Address:
        </label>
        <p className="mt-2">{address?.landmark}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="country" className="font-bold">
          Country:
        </label>
        <p className="mt-2">{address?.country}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="state" className="font-bold">
          State:
        </label>
        <p className="mt-2">{address?.state}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="district" className="font-bold">
          District:
        </label>
        <p className="mt-2">{address?.district}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="place" className="font-bold">
          Place:
        </label>
        <p className="mt-2">{address?.city}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="place" className="font-bold">
          pincode
        </label>
        <p className="mt-2">{address?.pincode}</p>
      </div>

      {/* Heading: Occupation Details */}
      <h2 className="text-2xl font-bold my-4 text-center">Occupation Details</h2>

      <div className="mb-4">
        <label htmlFor="category" className="font-bold">
          Category:
        </label>
        <p className="mt-2">{category}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="typeOfFarming" className="font-bold">
          Type of category:
        </label>
        <p className="mt-2">{occupation?.titile}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="available" className="font-bold">
          Available:
        </label>
        <p className="mt-2">{isUserOnline()}</p>
      </div>

      {/* Edit button */}
      <div className="flex justify-end mt-4">
        <EditDetails action={getUser} />
      </div>
    </div>
  );
};

export default Details;
