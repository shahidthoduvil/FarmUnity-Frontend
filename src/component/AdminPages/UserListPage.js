import React from 'react';
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin';
import Sidebar from '../Admin/Dashboard/Sidebar';
import UserList from '../Admin/user/UserList';

const UserListPage = () => {
  return (

<>
  <div className="flex ">
    <NavbarAdmin />
  </div>
  <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
    <div className="lg:w-1/4">
      <Sidebar />
    </div>
    <div className="flex-1">
      <UserList />
    </div>
  </div>
</>

  


  );
};

export default UserListPage;
