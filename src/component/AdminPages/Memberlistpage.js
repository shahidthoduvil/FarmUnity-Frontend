import React from 'react'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin'
import Sidebar from '../Admin/Dashboard/Sidebar'
import MemberList from '../Admin/MemberList.js/MemberList'
import { get } from 'react-hook-form'
import { getLocal } from '../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const Memberlistpage = () => {
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
      {/* Navbar */}
      <NavbarAdmin />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar />

        {/* User List */}
        <div className="flex-1 p-4 overflow-y-auto">
        <MemberList />
        </div>
      </div>
    </div>
  </>
  )
}

export default Memberlistpage