import React from 'react'
import AdminBanner from '../Admin/Banner/AdminBanner'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin';
import Sidebar from '../Admin/Dashboard/Sidebar';
const BannerLIstPage = () => {
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
        <AdminBanner />
        </div>
      </div>
    </div>
  </>
  )
}

export default BannerLIstPage