import React, { useState,useEffect } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDetails = ({Action}) => {
  const [size, setSize] = useState(null);
  const handleClose = () => setSize(null);

  const handleOpen = (value) => setSize(value);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [formData, setFormData] = useState({
   
    landmark: '',
    country: '',
    state: '',
    district: '',
    city: '',
    pincode: '',

  })
  const [errors, setErrors] = useState({
    landmark: '',
    country: '',
    state: '',
    district: '',
    city: '',
    pincode: '',
  });

  const localResponse = getLocal('authToken');
  const decoded = jwtDecode(localResponse);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/update_address/${decoded.user_id}/`)
      .then((response) => {
        const data = response.data;
        setFormData({
          landmark: data.landmark || '',
          country: data.country || '',
          state: data.state || '',
          district: data.district || '',
          city: data.city || '',
          pincode: data.pincode || '',
        });
      })
      .catch((error) => {
        console.error('Error fetching address:', error);
      });
  }, [decoded.user_id]);


  const handleAddress = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('LIVE :: ',formData);
  };
  


  
  const handleChangeDistrict = (event) => {
    const { name, value } = event.target;

    console.log('District Target :: ',event.target);
    console.log('District Field Name :: ',name);
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('LIVE :: ',formData);
  };

  
  const handleChangeCountry = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  
  const handleChangeState = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  
  const handleChangeCity = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleChangePincode = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

  const validateLandmark = (value) => {
    if (value.trim() === '') {
      return 'Landmark is required';
    }
    return '';
  };

  const validateCountry = (value) => {
    if (value.trim() === '') {
      return 'Country is required';
    }
    return '';
  };

  const validateState = (value) => {
    if (value.trim() === '') {
      return 'State is required';
    }
    return '';
  };

  const validateDistrict = (value) => {
    if (value.trim() === '') {
      return 'District is required';
    }
    return '';
  };

  const validateCity = (value) => {
    if (value.trim() === '') {
      return 'City is required';
    }
    return '';
  };

  const validatePincode = (value) => {
    if (value.trim() === '') {
      return 'Pincode is required';
    }
    return '';
  };






  const handleUpdate = async (event) => {
    event.preventDefault();


    const landmarkError = validateLandmark(formData.landmark);
    const countryError = validateCountry(formData.country);
    const stateError = validateState(formData.state);
    const districtError = validateDistrict(formData.district);
    const cityError = validateCity(formData.city);
    const pincodeError = validatePincode(formData.pincode);

    setErrors({
      landmark: landmarkError,
      country: countryError,
      state: stateError,
      district: districtError,
      city: cityError,
      pincode: pincodeError,
    });

   
    if (
      landmarkError ||
      countryError ||
      stateError ||
      districtError ||
      cityError ||
      pincodeError
    ) {
      return;
    }

    try {
   
      const formDataToSend = new FormData();
      formDataToSend.append('landmark', landmark);
      formDataToSend.append('city', city);
      formDataToSend.append('country', country);
      formDataToSend.append('district', district);
      formDataToSend.append('state', state);
      formDataToSend.append('pincode', pincode);




      await axios.patch(`${BASE_URL}/api/update_address/${decoded.user_id}/`, formData)
        .then((response) => {
          console.log('Quote updated successfully:', response.data);
          handleClose();
          Action()
 
        })
    } catch (error) {
      console.log(error);
  
    }
  }

  return (
    <div className="p-4 md:w-1/2 mx-auto">
      {/* Edit Profile Button  */}
      <div className="flex gap-3">
        <Button onClick={() => handleOpen('lg')} variant="gradient">
          Edit Profile
        </Button>
      </div>


      {/* Edit Dialog */}
      
      <Dialog open={size === 'lg'} size={size || 'md'} handler={() => handleOpen(null)}>
      <ToastContainer />
        <form onSubmit={handleUpdate}>
          <DialogHeader>EDIT YOUR Details</DialogHeader>
          <DialogBody className="dialog-content" style={{ 'height': '400px', 'overflow-y': 'auto' }}>
            <div className="bg-gray-200 min-h-screen">
              <div className="p-8 bg-white shadow mt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="addressInput" className="text-gray-500">
                      Address
                    </label>
                    <input
                      id="addressInput"
                      name="landmark"
                      type="text"
                      className="mt-1 p-2 border border-gray-300 rounded"
                      value={formData.landmark}
                      onChange={handleAddress}
                    />
                      <div className="text-red-500">{errors.landmark}</div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="countryInput" className="text-gray-500">
                      Country
                    </label>
                    <input
                      id="countryInput"
                      name="country"
                      type="text"
                      className="mt-1 p-2 border border-gray-300 rounded"
                      value={formData.country}
                      onChange={handleChangeCountry}
                    />
                      <div className="text-red-500">{errors.country}</div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="stateInput" className="text-gray-500">
                      State
                    </label>
                    <input
                      id="stateInput"
                      name="state"
                      type="text"
                      className="mt-1 p-2 border border-gray-300 rounded"
                      value={formData.state}
                      onChange={handleChangeState }
                    />
                      <div className="text-red-500">{errors.state}</div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="districtInput" className="text-gray-500">
                      District
                    </label>
                    <input
                      id="districtInput"
                      name="district"
                      type="text"
                      className="mt-1 p-2 border border-gray-300 rounded"
                      value={formData.district}
                      onChange={handleChangeDistrict}
                    />
                      <div className="text-red-500">{errors.district}</div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="placeInput" className="text-gray-500">
                      Place
                    </label>
                    <input
                      id="placeInput"
                      name="city"
                      type="text"
                      className="mt-1 p-2 border border-gray-300 rounded"
                      value={formData.city}
                      onChange={handleChangeCity }
                    />
                      <div className="text-red-500">{errors.city}</div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="pincodeInput" className="text-gray-500">
                      Pincode
                    </label>
                    <input
                      id="pincodeInput"
                      name="pincode"
                      type="text"
                      className="mt-1 p-2 border border-gray-300 rounded"
                      value={formData.pincode}
                      onChange={handleChangePincode}
                    />
                      <div className="text-red-500">{errors.city}</div>
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient" color="green">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

    </div>
  );
};

export default EditDetails;
