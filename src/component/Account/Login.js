import React, { useEffect } from 'react';
import background1 from '../../images/py.jpg'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import login, { getLocal } from '../../helpers/auth'
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';


function Login() {

  const history = useNavigate();
  const response = getLocal()



  useEffect(() => {
    if (response) {
      history('/')
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can make an API call to your backend server for authentication
    const login_response = await login(e);
  
    const local_response = getLocal('authToken');
    // console.log(local_response, 'from local storage');
    if (local_response) {
      const location = localStorage.getItem('location')
      const decoded = jwt_decode(local_response)
      console.log(decoded, 'decoded in login page');
      if (decoded.is_admin) {
        history('/AdminPanelPage')
      } else if (decoded.is_staff) {
        console.log('staff');
        history('/AdminPanelPage')
      } else if (location) {
        history(location, { replace: true })
        localStorage.removeItem('location')
      } else {
        history('/', { replace: true })
      }
    } else {
      toast.loading('Please Login into your accout',{duration: 2000});

    }
  }
  






const handleGoogleSignIn = () => {
  // Handle Google sign-in logic here
  console.log('Sign in with Google clicked');
};

return (
  <div
    className="bg-cover bg-center min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `url(${background1})`, // Replace with the path to your image
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
            name="email"
       

            required
            className="w-full border border-gray-300 px-3 py-2 mb-4 rounded-md"
          />
          <label htmlFor="password" className="block mb-2 font-light">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
          

            required
            className="w-full border border-gray-300 px-3 py-2 mb-4 rounded-md"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-slate-500 text-white font-medium py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-4">
          <p
            

            className="text-blue-500"
          >
            Forgot Password?
          </p>
        </div>
        <div className="mt-4">

          <Link to='/signup'><p className="text-blue-500">
            Don't have an Account?
          </p></Link>
        </div>

        <div className="my-4 border-b border-gray-300"></div>

        <h2 className="text-2ml font-medium mb-4 text-center">Or</h2>
        <button
          onClick={handleGoogleSignIn}
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






