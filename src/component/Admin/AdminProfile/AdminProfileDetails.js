import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/config';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import profilePicture from '../../../images/images.jpeg';
import { getLocal } from '../../../helpers/auth';
import { useNavigate } from 'react-router-dom';


const AdminProfileDetails = () => {
  const [admin, setAdmin] = useState({});
  const localResponse = localStorage.getItem('authToken');
  const decoded = jwtDecode(localResponse);
  const  navigate=useNavigate()

 

  useEffect(() => {
    fetchAdminProfile();
  }, [decoded.user_id]);

  const fetchAdminProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin-profiles/${decoded.user_id}/`);
      setAdmin(response.data);
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };


  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (!decoded.is_admin==true) {
        navigate('/adm/login')
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative bg-cover bg-center h-72 md:h-96" style={{ backgroundImage: `url(admin.cover)`}}>
        <div className="p-16">
          <div className="p-8 bg-white rounded-3xl shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              <div className="grid grid-cols-3 text-center md:order-first mt-20 md:mt-0">
                <div className="flex items-center gap-2">
              

                </div>
              </div>
              <div className="relative col-span-2">
                <div className="w-48 h-48 bg-[#788F69] mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  {admin?.pic ? (
                    <img src={admin.pic} alt="Profile" className="w-40 h-40 rounded-full" />
                  ) : (
                    <img src={profilePicture} alt="Profile" className="w-40 h-40 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-28 text-center border-b pb-12 bg-white">
          <h1 className="c">{admin.username}</h1>
          <h1 className="c">{admin.email}</h1>
          <h1 className="c">{admin.phone_number}</h1>
          <div className="mt-4 space-y-2">
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileDetails;
;
