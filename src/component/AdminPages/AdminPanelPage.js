import React from 'react'
import Sidebar from '../Admin/Dashboard/Sidebar'
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin'

const AdminPanelPage = () => {
  return (
<div className="flex flex-col min-h-screen">
  <div className="bg-[#788F69]">
    <div className="container mx-auto px-4 py-8">
      <NavbarAdmin />
    </div>
  </div>
  <div className="flex flex-col md:flex-row flex-1">
    <div className="w-full md:w-1/4 bg-[#788F69]  ">
      <div className="h-full p-4 flex flex-col rounded-lg shadow-md">
        <Sidebar />
      </div>
    </div>
    <div className="flex  bg-[#788F69] flex-col md:flex-row flex-1">
      <div className="md:ml-4 flex-1 bg-white rounded-lg shadow-md ">
        <div className="p-4">
          <div className="h-full overflow-y-auto">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

     
    
  )
}

export default AdminPanelPage