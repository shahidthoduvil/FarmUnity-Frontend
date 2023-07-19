


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import profilePicture from '../../images/images.jpg'; // Replace with your default profile picture
import profileBackground from '../../images/images.jpg'; // Replace with your default background picture
import { BASE_URL } from '../../utils/config';
import axios from 'axios';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [place, setPlace] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [isStep1Complete, setIsStep1Complete] = useState(false);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(file);
  };

  const handleStep1Submit = (event) => {
    event.preventDefault();
    // Handle Step 1 form submission here, set isStep1Complete to true
    setIsStep1Complete(true);
  };

  const handleStep2Submit = async (event) => {
    event.preventDefault();

    // Send form data and uploaded images to the server for setup
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);
      formData.append('backgroundImage', backgroundImage);
      formData.append('username', username);
      formData.append('city', city);
      formData.append('category', category);
      formData.append('subcategory', subcategory);
      formData.append('country', country);
      formData.append('state', state);
      formData.append('district', district);
      formData.append('place', place);
      formData.append('pincode', pincode);
      formData.append('address', address);

      // Make an API call to the server to save the profile setup data
      await axios.post(`${BASE_URL}/api/profile-setup`, formData);

      // Redirect to the profile page after successful setup
      navigate.push('/profile');
    } catch (error) {
      console.log(error);
      // Handle error case if needed
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h4 className="text-2xl font-semibold mb-4 text-center">Complete the Profile Setup</h4>
        {!isStep1Complete ? (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            {/* Step 1: Include necessary fields */}
            <label htmlFor="backgroundImage" className="cursor-pointer mb-4 relative">
            {backgroundImage ? (
              <img
                src={URL.createObjectURL(backgroundImage)}
                alt="Background Image"
                className="w-full h-36 rounded-md mb-2"
              />
            ) : (
              <img src={profileBackground} alt="Background Image" className="w-full h-24 rounded-md mb-2" />
            )}
            <div className="text-center text-indigo-500 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-40 rounded-md">
              <IoIosAdd className="w-6 h-6 text-white" />
            </div>
            <input
              id="backgroundImage"
              type="file"
              className="hidden"
              onChange={handleBackgroundImageChange}
              accept="image/*"
            />
          </label>
          <div className="h-24 rounded-full mb-2 flex justify-center w-full">
            <label htmlFor="profileImage" className="cursor-pointer mb-4 relative">
              {profileImage ? (
                <img src={URL.createObjectURL(profileImage)} alt="Profile Image" className="w-24 h-24 rounded-full mb-2" />
              ) : (
                <div className="w-24 h-24 bg-[#788F69] mx-auto rounded-full shadow-md flex items-center justify-center">
                  {/* Use the add icon for profile image */}
                  <IoIosAdd
                    className="w-8 h-8 text-white cursor-pointer"
                    onClick={() => document.getElementById('profileImage').click()}
                  />
                </div>
              )}
              <input
                id="profileImage"
                type="file"
                className="hidden"
                onChange={handleProfileImageChange}
                accept="image/*"
              />
            </label>
          </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                Subcategory
              </label>
              <select
                id="subcategory"
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option value="">Select Subcategory</option>
                <option value="subcategory1">Subcategory 1</option>
                <option value="subcategory2">Subcategory 2</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next (Step 1)
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            {/* Step 2: Include additional fields */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                id="country"
                type="text"
                required
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                id="state"
                type="text"
                required
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                District
              </label>
              <input
                id="district"
                type="text"
                required
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                Place
              </label>
              <input
                id="place"
                type="text"
                required
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                required
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                type="text"
                required
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Profile Setup 
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
