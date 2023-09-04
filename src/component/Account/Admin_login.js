


import React, { useState } from 'react';
import background1 from '../../images/farmcom.jpg';
import { useNavigate } from 'react-router-dom';
import login, { getLocal } from '../../helpers/auth';
import { toast, Toaster } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

function Admin_login() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');




  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await login(e);

    if (loginResponse) {
      const localResponse = localStorage.getItem('authToken');
      const decoded = jwtDecode(localResponse);

      if (decoded.is_admin) {
        // If the user is an admin, redirect to the admin page
        navigate('/adm');
        toast.success('Logged in successfully');
      } else {
        // If the user is not an admin, show the toast message and don't redirect
        toast.error("You can't login because you are not an admin.");
      }
    }
  };
  

  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (decoded.is_admin==true) {
        navigate('/adm')
      }else{
        navigate('/home')
      }
    }
  }, []);



  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${background1})`,
      }}
    >
      <Toaster position="top-center" reverseOrder={false} limit={1}></Toaster>

      <div className="flex items-center justify-center w-screen ">
        <div className="max-w-sm w-full mx-auto px-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center mt-3">Admin Login</h2>
          <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-2 font-light">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            className="w-full border border-gray-300 px-3 py-2 mb-4 rounded-md"
                        />
                        <label htmlFor="password" className="block mb-2 font-light">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'


                            className="w-full border border-gray-300 px-3 py-2 mb-4 rounded-md"
                        />
                        <div className="flex justify-center bg-black">
                            <button
                                type="submit"
                                className="w-1/2 bg-slate-500 text-white font-medium py-2 rounded-md"
                            >
                                Submit
                            </button>
                        </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin_login;
