import React, { useState, useEffect } from 'react';
import background2 from '../../images/try.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/config'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';


function Signup() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const navigate=useNavigate()
  

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  }
  const data = {
    first_name,
    last_name,
    email,
    username,
    phone_number,
    password,
  }
  const validatePhoneNumber = () => {
    const phoneRegex = /^[0-9]+$/;
    if (!phone_number.trim()) {
      toast.error('Please fill phone number field');
      return false;
    } else if (!phoneRegex.test(phone_number)) {
      toast.error('Phone number should contain only numbers');
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.trim()) {
      toast.error('Please fill email field');
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!password.trim()) {
      toast.error('Please fill password field');
      return false;
    } else if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
      return false;
    }
    return true;
  };

  const validateUsername = () => {
    if (!username.trim()) {
      toast.error('Please fill username field');
      return false;
    } else if (username.trim().length < 6) {
      toast.error('Username must be at least 6 characters long');
      return false;
    }
    return true;
  }
  const validateFirstName = () => {
    if (!first_name.trim()) {
      toast.error('Please fill firstname field');
      return false;
    }
    return true;
  }
  const validateLastName = () => {
    if (!last_name.trim()) {
      toast.error('Please fill lastname field');
      return false;
    }
    return true;
  }
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFirstName() || !validateLastName() || !validateUsername() || !validatePhoneNumber() || !validateEmail() || !validatePassword()) {
      return;
    }




    if (password == confirmPassword) {

      try {
        const response = await axios.post(BASE_URL + '/api/register/', data);
        console.log(response);
        if (response.status) {
          toast.success('Registration successful! Check your email to activate your account', { duration: 5000 });


        }
        else {
          toast.error('Something went wrong');
        }
      } catch (error) {

        console.error(error);
      }

    }
    else {
      Swal.fire('oops', 'password mismatch', 'error')
    }













    nextStep();

  };

 
  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (!decoded.is_admin==true) {
        navigate('/')
      }
      else{
        navigate('/adm')
      }
    }
  }, []);


  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center backdrop-blur-lg"
      style={{
        backgroundImage: `url(${background2})`, // Replace with the path to your image
      }}
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="bg-white border-s p-8 rounded-xl shadow-md max-w-lg w-11/12 backdrop-blur-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-6">
              <label htmlFor="firstname" className="block mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="lastname" className="block mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your last name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="username" className="block mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter a username"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phonenumber" className="block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phonenumber"
                name="phonenumber"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-12 md:col-span-2">
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter a password"
              />
            </div>
            <div className="mb-6 ">
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Confirm your password"
              />
            </div>
          </div>
 
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Signup
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600">
              Please login.
            </Link>
          </p>
        </form>
      </div>
    </div>

  );
}

export default Signup;