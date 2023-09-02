import React from 'react'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin'
import Sidebar from '../Admin/Dashboard/Sidebar'
import Quotes from '../Admin/Quote/Quotes'
import { getLocal } from '../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const QuotesPage = () => {

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
        <Quotes />
        </div>
      </div>
    </div>
    
  </>
  )
}

export default QuotesPage