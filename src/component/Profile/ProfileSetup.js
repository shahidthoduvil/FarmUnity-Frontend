


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import profileBackground from '../../images/images.jpg'; // Replace with your default background picture
import { BASE_URL } from '../../utils/config';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProfileSetup = ({id,user_id}) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [place, setPlace] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [isStep1Complete, setIsStep1Complete] = useState(false);
  const [isStep2Complete, setIsStep2Complete] = useState(false);
  const [cat, setCategories] = useState([]);
  const [Occup, setOccupations] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  // Gather category and occupation data from the state

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(file);
  };



  const handleStep1Submit = async (event) => {
    event.preventDefault();
    // Handle Step 1 form submission here, set isStep1Complete to true



      // Send form data and uploaded images to the server for setup
      try {
        const formData = new FormData();
        formData.append('backgroundImage', backgroundImage);
        formData.append(' profileImage', profileImage);
        formData.append('cat', cat);
        formData.append('Occup', Occup);
  
  
        // Make an API call to the server to save the profile setup data
          const result = await axios.put(`${BASE_URL}/api/profile-setup1/${35}/`, formData);
          console.log('Profile data',result.data);
          toast.error('sucesss')
        
   } catch (error) {
     console.log(error);
      // Handle error case if needed
     }
    
    if (cat && Occup && profileBackground && profileImage) {
      setIsStep1Complete(true);
    } else {
      setIsStep1Complete(false);
    }

   

  };



  const handlePreviousStep = (event) => {
    event.preventDefault();
    // Navigate back to Step 1
    setIsStep1Complete(false);
  };

  const fetchOccupationData = async (categoryId) => {
    try {
      const url = `${BASE_URL}/api/category-occupation-list/?category=${categoryId}`

      const response = await axios.get(url);
      setOccupations(response.data.Occup);
      console.log('response: ', response.data);
    } catch (error) {
      console.error('Error fetching category and occupation data:', error);
    }
  };


  // Event handler for category selection change
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategoryId(selectedCategoryId); // Update the selected category ID
    fetchOccupationData(selectedCategoryId)
  };

  const fetchCategoryOccupationData = async (categoryId) => {
    try {
      const url = categoryId
        ? `${BASE_URL}/api/category-occupation-list/?category=${categoryId}`
        : `${BASE_URL}/api/category-occupation-list/`;

      const response = await axios.get(url);
      setCategories(response.data.cat);

    } catch (error) {
      console.error('Error fetching category and occupation data:', error);
    }
  };


  useEffect(() => {
    fetchCategoryOccupationData(selectedCategoryId);
  }, [selectedCategoryId]);





  const handleStep2Submit = async (event) => {
    event.preventDefault();
    if (country && state && district && place && pincode && address) {
      setIsStep2Complete(true);
    } else {
      setIsStep2Complete(false);
    }



    // Send form data and uploaded images to the server for setup
    try {
      const formData = new FormData();

      formData.append('city', city);
      formData.append('country', country);
      formData.append('state', state);
      formData.append('district', district);
      formData.append('place', place);
      formData.append('pincode', pincode);
      formData.append('address', address);

      // Make an API call to the server to save the profile setup data
        const result = await axios.post(`${BASE_URL}/api/profile-setup2/`, formData);
        console.log('Profile data',result.data);
        toast.error('sucesss')
      // Redirect to the profile page after successful setup
    navigate('/profile');
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
          id="cat"
          className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleCategoryChange}
          value={selectedCategoryId} // Added to bind the selected category to the state
        >
          <option value="">Select Category</option>
          {cat.map((category) => (
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
          id="Occup"
          className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Occupation</option>
          {Occup.map((occupation) => (
              <option key={occupation.id} value={occupation.id}>
                {occupation.titile}
              </option>
            ))}
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
                id="place"
                type="text"
     
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
      
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              <button
                type="submit"
              
                // disabled={isStep2Complete}

                className={`w - full flex justify - center py - 2 px - 4  border - transparent ML - 5 rounded - md shadow - sm text - sm font - medium text - white ${ isStep2Complete ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'bg-gray-300 cursor-not-allowed' } `}
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
