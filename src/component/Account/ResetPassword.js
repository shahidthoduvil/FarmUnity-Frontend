import React,{useState,} from 'react'
import { toast,Toaster,} from "react-hot-toast";
import background1 from '../../images/py.jpg'
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../../utils/config';
import { useEffect } from 'react';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
  
    const navigate = useNavigate();
    

    const user_id = localStorage.getItem('user_id')
    // console.log(user_id);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password === password2) {
            const response = await fetch(`${BASE_URL}/api/resetPassword/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id,    
                    password
                })
            })
            if (response.status === 200) {
                toast.success('Password updated')
                localStorage.removeItem('user_id')
                navigate('/login')
            }
        }
    }

    useEffect(() => {
      const localResponse = getLocal('authToken');
      if (localResponse) {
        const decoded = jwtDecode(localResponse);
        console.log('Decoded from setup complete ::: ', decoded);
        if (!decoded.is_admin==true) {
          navigate('/home')
        }
        else{
          navigate('/adm')
        }
      }
    }, []);
  
  
    return (
      <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background1})`,
      }}
    >
          <Toaster position='top-center' reverseOrder='false' limit={1} ></Toaster>
  
      <div className="flex flex-col w-full max-w-md p-6 rounded-lg shadow-lg bg-opacity-80 bg-white">
        <h2 className="mb-6 text-3xl font-semibold text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              New Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 font-medium">
              Confirm Password:
            </label>
            <input
              type="password"
              name="password2"
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#788F69] rounded-md hover:bg-[#3e5131]"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  
  )
}

export default ResetPassword