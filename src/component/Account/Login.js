import React, { useEffect, useState } from 'react';
import background1 from '../../images/py.jpg'
import { useNavigate } from 'react-router-dom';
import login, { getLocal } from '../../helpers/auth'
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { GoogleAuthentication } from './GoogleAuthentication';
import { useGoogleLogin } from '@react-oauth/google';
import { base_url, BASE_URL } from '../../utils/config';


function Login() {


  const navigate = useNavigate();

  const [user, setUser] = useState('')

  console.log('Reached Login page!!');

  useEffect(() => {
    const localResponse = getLocal('authToken');
    console.log('local response from login ::.>> ', localResponse);
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      if (decoded.is_setup_complete == true) {
        navigate('/')
      }
      else{
        navigate('/profile-setup')
      }

      // If the user is not logged in, display an error message
      toast.loading('Please Login into your account', { duration: 2000 });
    }
  }, []);




  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
        .then((res) => {
          const userProfile = res.data
      
          console.log('user profile is:', userProfile);
          console.log('user profile is:', res.data)
          const values = {
            email: userProfile.email,
            username:userProfile.username,
            first_name: userProfile.given_name,
            last_name: userProfile.family_name,
            password: userProfile.id,
            is_google: true
          }
          axios.post(`${base_url}/google_authentication/`, values).then((res) => {
            console.log('Hello ::>> ', res.data);
            localStorage.setItem('authToken', JSON.stringify(res.data.token))
            navigate('/');

          })
            .catch((error) => {
              console.error("Axios request error:", error);


            });

        })
        .catch((err) => toast.error('WOrked'));
    }
  }, [user])





  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginResponse = await login(e);
    console.log(loginResponse, 'login response');




    if (loginResponse) {
    
      navigate('/');
      toast.success('Logged in succesfully')

    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${background1})`,
      }}
    >
      <Toaster position='top-center' reverseOrder='false' limit={1} ></Toaster>

      <div className="flex items-center justify-center w-screen ">
        <div className="max-w-sm w-full mx-auto px-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center mt-3">Login</h2>
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

          <div className="mt-4">
            <Link to='/forgot-password'> <p


              className="text-blue-500"
            >
              Forgot Password?
            </p></Link>
          </div>
          <div className="mt-4">

            <Link to='/signup'><p className="text-blue-500">
              Don't have an Account?
            </p></Link>
          </div>

          <div className="my-4 border-b border-gray-300"></div>

          <h2 className="text-2ml font-medium mb-4 text-center">Or</h2>
          <button
            onClick={() => handleGoogleAuth()}
            className="w-full bg-gray-300 text-black font-medium py-2 rounded-md mb-8"
          >
            Sign in with Google
          </button>

        </div>
      </div >
    </div >
  );
};


export default Login;