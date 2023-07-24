import React from 'react'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin'
import Sidebar from '../Admin/Dashboard/Sidebar'
import MemberList from '../Admin/MemberList.js/MemberList'

const Memberlistpage = () => {
  return (
    <>
    <NavbarAdmin />
    <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
      <div className="order-2 lg:order-1">
        <Sidebar />
      </div>
      <div className="order-1 lg:order-2 flex-1">
        <MemberList />
      </div>
      
    </div>
  </>
  )
}

export default Memberlistpage