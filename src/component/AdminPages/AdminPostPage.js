import React from 'react'
import AdminPost from '../Admin/Post/AdminPost'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin';
import Sidebar from '../Admin/Dashboard/Sidebar';


const AdminPostPage = () => {
  return (

    <>
   

    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <NavbarAdmin />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar />

      {/* post */}
        <div className="flex-1 p-4 overflow-y-auto">
        <AdminPost/>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default AdminPostPage