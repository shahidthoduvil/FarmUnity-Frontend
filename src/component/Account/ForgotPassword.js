import React,{useState} from 'react'
import background1 from '../../images/py.jpg'
import { toast,Toaster,} from "react-hot-toast";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { useEffect } from 'react';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';

const ForgotPassword = () => {
    const [email,setEmail] = useState("")


    const navigate = useNavigate("")

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/forgot_password/`,{email:email}
    ).then((res) => {
        // Convert the response object to a string
        const dataString = JSON.stringify(res.data); 
        console.log(dataString)
       // Store the data in the local storage with a specific key
        localStorage.setItem('response', dataString);
        toast.success('Check Email for Reseting password');
      })
      .catch((error) => {
        toast.error('Email not existing');
        console.log(error);
      });
  }
  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (!decoded.is_admin==true) {
        navigate('/')
      }else{
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
    <Toaster position='top-center' reverseOrder='false'  ></Toaster>

    <div className="flex flex-col w-full max-w-md p-6 bg-opacity-90  bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="username"
            onChange={(e) => setEmail(e.target.value)}
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
      </form  > 
      <div className="mt-4 text-center">
       <p className="text-blue-500">
          Already a Member <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  </div>
  )
}

export default ForgotPassword