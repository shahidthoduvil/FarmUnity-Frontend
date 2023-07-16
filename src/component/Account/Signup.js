import React, { useState, useEffect } from 'react';
import background2 from '../../images/try.jpg'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../utils/config'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios';
import Swal from 'sweetalert2';


function Signup() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('');
  // const passwordRegex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

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

  const handleStep1Submit = async (e) => {
    e.preventDefault();

   
  
    
    // if (!passwordRegex.test(password)) {
    //   toast.error('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
    //   return;
    // }
    
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
        toast.error('An error occurred while registering');
        console.error(error);
      }

    }
    else {
      Swal.fire('oops', 'password mismatch', 'error')
    }
    if (!username.trim('') || !first_name.trim('') || !last_name.trim('') || !phone_number.trim('') || !email.trim('') || !password.trim('') || !confirmPassword.trim('')) {
      toast.error('Please fill all fields');
      
    }
    if (!category.trim('')) {
      toast.error('Please select a category');
     
    }

  
  
    
    // if (!passwordRegex.test(password)) {
    //   toast.error('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
    //   return;
    // }



    nextStep();
    
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center backdrop-blur-lg "
      style={{
        backgroundImage: `url(${background2})` // Replace with the path to your image
      }}
    >
      <Toaster position='top-center' reverseOrder='false'  ></Toaster>

      <div className="bg-white border-s p-8 rounded-xl shadow-md max-w-lg w-11/12 backdrop-blur-lg">
      <form onSubmit={handleStep1Submit}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`rounded-full p-3 hover:bg-green-400 hover:text-white ${step === 1 ? 'bg-white-500 text-black' : 'bg-gray-200 text-gray-700'
              }`}
          >
            Step 1
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`rounded-full p-3 hover:bg-green-400 hover:text-white ${step === 2 ? 'bg-white text-black' : 'bg-gray-200 text-gray-700'
              }`}
            disabled={step === 2}
          >
            Step 2
          </button>
        </div>
        {step === 1 && (
          <div className="step1">
         
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
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
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
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
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
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
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
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
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
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
                  required
                />
              </div>
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
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
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
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
                    required
                  />
                </div>
              </div>


          </div>
        )}
        {step === 2 && (
          <div className="step2">

            <div className="mb-4">
              <label htmlFor="category" className="block mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded"

              >
                <option value="">Select Category</option>
                <option value="brazil">Brazil</option>
                <option value="bucharest">Bucharest</option>
                <option value="london">London</option>
                <option value="washington">Washington</option>


              </select>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
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
          </div>
        )}
        </form>
    </div>
     
    </div >


  );
}

export default Signup;
