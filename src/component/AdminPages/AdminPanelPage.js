import React from 'react'
import Sidebar from '../Admin/Dashboard/Sidebar'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin'

const AdminPanelPage = () => {
  return (
<div className="flex flex-col min-h-screen bg-gray-100">
    <div className="bg-[#788F69]">
      <div className="container mx-auto px-4 py-8">
        <NavbarAdmin />
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 px-4 py-6 md:px-8 md:py-8">
        <div className="md:w-1/4">
          <Sidebar />
        </div>
        <div className="flex-1">
          
        </div>
      </div>
    </div>
  </div>

     
    
  )
}

export default AdminPanelPage