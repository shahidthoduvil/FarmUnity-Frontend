import React from 'react'
import AdminBanner from '../Admin/Banner/AdminBanner'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin';
import Sidebar from '../Admin/Dashboard/Sidebar';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const BannerLIstPage = () => {

  const navigate=useNavigate()
  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (!decoded.is_admin==true) {
        navigate('/')
      }
    }
  }, []);
  return (
    <>
    <div className="flex flex-col h-screen">
 
      <NavbarAdmin />
    


      <div className="flex-1 flex">
 
        <Sidebar />

   
        <div className="flex-1 p-4 overflow-y-auto">
        <AdminBanner />
        </div>
      </div>
    </div>
  </>
  )
}

export default BannerLIstPage