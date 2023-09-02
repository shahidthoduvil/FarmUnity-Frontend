


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import profileBackground from '../../images/images.jpg'; // Replace with your default background picture
import { BASE_URL } from '../../utils/config';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { Typography } from  '@material-tailwind/react';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [pic, setProfileImage] = useState(null);
  const [cover, setBackgroundImage] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [isStep1Complete, setIsStep1Complete] = useState(false);
  const [isStep2Complete, setIsStep2Complete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedOccupationId, setSelectedOccupationId] = useState('');
 
 
  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (decoded.is_admin==true) {
        navigate('/adm')
      }
    }
  }, []);





  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (decoded.is_setup_complete == true) {
        navigate('/')
      }
    }
    else {
      navigate('/login')
    }
  }, []);


 
  const [isSignedOut, setIsSignedOut] = useState(false); 

  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (!localResponse) {
      navigate('/login');
    }
  }, []);

 
  const handleSignOut = () => {
    localStorage.removeItem('authToken'); 
    setIsSignedOut(true); 
    navigate('/login');
  };



  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };



  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(file);
  };


  const localResponse = getLocal('authToken');
  const decoded = jwtDecode(localResponse);


  const handleStep1Submit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('cover', cover);
    formData.append('pic', pic);
    formData.append('Occup',selectedOccupationId );
    formData.append('cat',selectedCategoryId);
    console.log('Form Data ::>> ',formData);

    const result = await axios.put(`${BASE_URL}/api/profile-setup1/${decoded.user_id}/`, formData);
    console.log('Profile dataffff', result.data);
    toast.error('sucesss')


    if (categories && occupations && cover && pic) {
      setIsStep1Complete(true);
    } else 
    {
      setIsStep1Complete(false);
    }
  };



  const handlePreviousStep = (event) => {
    event.preventDefault();
    setIsStep1Complete(false);
  };

  const fetchOccupationData = async (categoryId) => {
    try {
      const url = `${BASE_URL}/api/category-occupation-list/?category=${categoryId}`

      const response = await axios.get(url);
      setOccupations(response.data.occupations);
      console.log('response: ', response.data);
    } catch (error) {
      console.error('Error fetching category and occupation data:', error);
    }
  };



  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategoryId(selectedCategoryId);
    fetchOccupationData(selectedCategoryId);
  };

  const handleOccupationChange = (event) => {
    const selectedOccupationId = event.target.value;
    setSelectedOccupationId(selectedOccupationId);
  };



  const fetchCategoryOccupationData = async (categoryId) => {
    try {
      const url = categoryId
        ? `${BASE_URL}/api/category-occupation-list/?category=${categoryId}`
        : `${BASE_URL}/api/category-occupation-list/`;

      const response = await axios.get(url);
      setCategories(response.data.categories);

    } catch (error) {
      console.error('Error fetching category and occupation data:', error);
    }
  };


  useEffect(() => {
    fetchCategoryOccupationData(selectedCategoryId);
  }, [selectedCategoryId]);


  const isStep1FieldsComplete = () => {
    return categories && occupations && cover && pic;
  };



  const handleStep2Submit = async (event) => {
    event.preventDefault();




    // Send form data and uploaded images to the server for setup

    try {
      const formData = new FormData();

      formData.append('city', city);
      formData.append('country', country);
      formData.append('state', state);
      formData.append('district', district);
      formData.append('city', city);
      formData.append('pincode', pincode);
      formData.append('landmark', landmark);
      formData.append('user', decoded.user_id)

      const result = await axios.post(`${BASE_URL}/api/profile-setup2/`, formData);
      console.log('Profile data', result.data);
      console.log(decoded,'decoded.email');
      const token_response = await axios.post(`${BASE_URL}/api/get-new-token`, {email:decoded.email});

  
       console.log(token_response.data.token,'token_response>>>>>>.');
      localStorage.setItem('authToken',JSON.stringify(token_response.data.token))

      navigate('/');
    } catch (error) {
      console.log(error);
      // Handle error case if needed
    }
  };




  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">

      {localResponse ? (
          <Typography
            variant="subtitle1"
            className="font-normal cursor-pointer text-blue-600"
            onClick={() => handleSignOut()}
          >
            Sign Out
          </Typography>
        ) : (
          <Typography variant="subtitle1" className="font-normal">
            <Link to="/login" className="text-blue-600">
              Log In
            </Link>
          </Typography>
        )}
       
     
        <h4 className="text-2xl font-semibold mb-4 text-center">Complete the Profile Setup</h4>
        {!isStep1Complete ? (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            {/* Step 1: Include necessary fields */}
            <label htmlFor="backgroundImage" className="cursor-pointer mb-4 relative">
              {cover ? (
                <img
                  src={URL.createObjectURL(cover)}
                  alt="Background Image"
                  className="w-full h-36 rounded-md mb-2"
                />
              ) : (
                <img src={cover} alt="Background Image" className="w-full h-24 rounded-md mb-2" />
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
                {pic ? (
                  <img src={URL.createObjectURL(pic)} alt="Profile Image" className="w-24 h-24 rounded-full mb-2" />
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
                id="categories"
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleCategoryChange}
                value={selectedCategoryId}
              // Added to bind the selected category to the state
              >



                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.Category_name}
                  </option>
                ))}
              </select>

            </div>
            <div>
              <label htmlFor="occupations" className="block text-sm font-medium text-gray-700">
                Occupation
              </label>
              <select
                id="occupations"
                value={selectedOccupationId}
                onChange={handleOccupationChange}
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option >Select Occupation</option>
                {occupations.map((occupation) => (
                  <option key={occupation.id} value={occupation.id}>
                    {occupation.titile}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
                 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-nonefocus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={!isStep1FieldsComplete()}
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
                id="city"
                type="text"

                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                id="pincode"
                type="text"

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
                id="landmark"
                type="text"

                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              {/* <button
                type="submit"

                // disabled={isStep2Complete}

                className={`w-full flex justify-center py-2 px-4 border border-transparent ML-5 rounded-md shadow-sm text-sm font-medium text-white
                ${isStep2Complete ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'bg-gray-300 cursor-not-allowed'}`}

              >
                Save Profile Setup
              </button> */}

<button
  type="submit"
  className="w-full flex justify-center py-2 px-4 border border-transparent ML-5 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
