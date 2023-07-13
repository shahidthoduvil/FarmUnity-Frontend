import React, { useState } from 'react';
import background1 from '../../images/py.jpg'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can make an API call to your backend server for authentication
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    // Handle "Forgot Password" logic here
    console.log('Forgot Password clicked');
  };

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
              value={email}
              onChange={handleEmailChange}
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
              value={password}
              onChange={handlePasswordChange}
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
        <a
          href="#!"
          onClick={handleForgotPassword}
          className="text-blue-500"
        >
          Forgot Password?
        </a>
      </div>
      <div className="mt-4">

        <a href="#!" className="text-blue-500">
          Don't have an Account?
        </a>
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
}

export default Login;
