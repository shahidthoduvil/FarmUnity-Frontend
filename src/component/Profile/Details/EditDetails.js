import React, { useState,useEffect } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
const Example = ({action}) => {
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

  const localResponse = getLocal('authToken');
  const decoded = jwtDecode(localResponse);

  useEffect(() => {
    // Fetch the quote data when the component mounts
    axios.get(`${BASE_URL}/api/update_address/${decoded.user_id}/`)
      .then((response) => {
        setFormData(response.data); // Set the fetched data as initial state
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
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



  const handleUpdate = async (event) => {
    event.preventDefault();

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
          action()

          // Assuming "action" is a function passed as a prop to update the quotes list
        })
    } catch (error) {
      console.log(error);
      // Handle error case if needed
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
        <form onSubmit={handleUpdate}>
        <DialogHeader>EDIT YOUR Details</DialogHeader>
        <DialogBody className="dialog-content" style={{
          'height': '400px',
          'overflow-y': 'auto'
        }}>
          <div className="bg-gray-200 min-h-screen">
            <div className="p-8 bg-white shadow mt-24">
              {/* Editable Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="flex flex-col">
                  <label htmlFor="usernameInput" className="text-gray-500">
                    Username
                  </label>
                  <input
                    id="usernameInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="MOHAMMED MT"
                  />
                </div> */}

                
                <div className="flex flex-col">
                  <label htmlFor="addressInput" className="text-gray-500">
                    Address
                  </label>

                  
                  <input
                    id="countryInput"
                    name="landmark"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"

              
                    onChange={handleAddress}
                  />
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

          
                    onChange={handleChangeCountry}
                  />
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
               
                    onChange={handleChangeState}
                  />
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
                    
                    onChange={handleChangeDistrict}
                    />
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
                    
                    onChange={handleChangeCity}
                    />
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
          
                    onChange={handleChangePincode}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button type='submit' variant="gradient" color="green" onClick={() => handleOpen(null)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default Example;
