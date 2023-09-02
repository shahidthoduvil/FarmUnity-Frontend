import React from 'react'
import Sidebar from '../Admin/Dashboard/Sidebar'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin'
import { getLocal } from '../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const AdminPanelPage = () => {
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
    <NavbarAdmin/>
    <Sidebar/>

    
    </>

     
    
  )
}

export default AdminPanelPage