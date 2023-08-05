import React from 'react';
import NavbarAdmin from '../Admin/Dashboard/NavbarAdmin';
import Sidebar from '../Admin/Dashboard/Sidebar';
import UserList from '../Admin/user/UserList';

const UserListPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <NavbarAdmin />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar />

        {/* User List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
