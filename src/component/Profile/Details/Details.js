import React,{ useEffect, useState }  from 'react';
import EditDetails from'./EditDetails'
import axios from 'axios';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { BASE_URL } from '../../../utils/config';

const Details = () => {

  const [user, setUser] = useState({})
  const [occupation, setOccupation] = useState({})
  const [Address, setAddress] = useState({})



  const token = getLocal()
  const { user_id } = jwtDecode(token)

  useEffect(() => {
    getUser();
  

  }, [])


  async function getUser() {
    try {
    const response = await axios.get(`${BASE_URL}/api/getuserdetails/${user_id}`)
    console.log(response);
    setUser(response.data.user)
    setOccupation(response.data.user_occupation)
    setAddress(response.data.user_address)
  

       
  } catch (e) {
    console.log(e);
  }
  }

  return (
    <div className="p-4 md:w-1/2 mx-auto">
      {/* Heading: Address Details */}
      <h2 className="text-2xl font-bold mb-4 text-center">Address Details</h2>

      <div className="mb-4">
        <label htmlFor="username" className="font-bold">
          Username:
        </label>
        <p> </p>
        <input
          type="text"
          id="username"
          value={user?.username}
          readOnly
          className="form-input text-left"
        />
      </div>

      
      <div className="mb-4">
        <label htmlFor="email" className="font-bold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value=""
          readOnly
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="font-bold">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          value="98756412356"
          readOnly
          className="form-input"
        />
      </div>

      

      <div className="mb-4">
        <label htmlFor="address" className="font-bold">
          Address:
        </label>
        <textarea
          id="address"
          rows="3"
          readOnly
          className="form-textarea"
        >
          Arinallur PO, Mattimal House, Palakkad
        </textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="country" className="font-bold">
          Country:
        </label>
        <input
          type="text"
          id="country"
          value="India"
          readOnly
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="state" className="font-bold">
          State:
        </label>
        <input
          type="text"
          id="state"
          value="Kerala"
          readOnly
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="district" className="font-bold">
          District:
        </label>
        <input
          type="text"
          id="district"
          value="Palakkad"
          readOnly
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="place" className="font-bold">
          Place:
        </label>
        <input
          type="text"
          id="place"
          value="Arinallur"
          readOnly
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="pincode" className="font-bold">
          Pincode:
        </label>
        <input
          type="text"
          id="pincode"
          value="678941"
          readOnly
          className="form-input"
        />
      </div>



      {/* Heading: Occupation Details */}

      <h2 className="text-2xl font-bold my-4 text-center">Occupation Details</h2>

      

      <div className="mb-4">
        <label htmlFor="category" className="font-bold">
          Category:
        </label>
        <input
          type="text"
          id="category"
          value="Farmer"
          readOnly
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="typeOfFarming" className="font-bold">
          Type of farming:
        </label>
        <input
          type="text"
          id="typeOfFarming"
          value="Mixed Farming"
          readOnly
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="employee" className="font-bold">
          Employee:
        </label>
        <input
          type="text"
          id="employee"
          value="Nill"
          readOnly
          className="form-input"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="available" className="font-bold">
          Available:
        </label>
        <input
          type="text"
          id="available"
          value="Nill"
          readOnly
          className="form-input"
        />
      </div>


      {/* Edit button */}
      <div className="flex justify-end mt-4">
        <EditDetails/>
      </div>
    </div>
  );
};

export default Details;
