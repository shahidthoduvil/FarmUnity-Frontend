import React from 'react'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin'
import Sidebar from '../Admin/Dashboard/Sidebar'
import MemberList from '../Admin/MemberList.js/MemberList'

const Memberlistpage = () => {
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