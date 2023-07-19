import React, { useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

const Example = () => {
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

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
        <DialogHeader>EDIT YOUR Details</DialogHeader>
        <DialogBody className="dialog-content"  style={{
          'height': '400px',
          'overflow-y': 'auto'
        }}>
          <div className="bg-gray-200 min-h-screen">
            <div className="p-8 bg-white shadow mt-24">
              {/* Editable Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="usernameInput" className="text-gray-500">
                    Username
                  </label>
                  <input
                    id="usernameInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="MOHAMMED MT"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="phoneInput" className="text-gray-500">
                    Phone
                  </label>
                  <input
                    id="phoneInput"
                    type="tel"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="98756412356"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="addressInput" className="text-gray-500">
                    Address
                  </label>
                  <textarea
                    id="addressInput"
                    rows="3"
                    className="form-textarea mt-1 p-2 border border-gray-300 rounded"
                  >
                    Arinallur PO, Mattimal House, Palakkad
                  </textarea>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="countryInput" className="text-gray-500">
                    Country
                  </label>
                  <input
                    id="countryInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="India"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="stateInput" className="text-gray-500">
                    State
                  </label>
                  <input
                    id="stateInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="Kerala"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="districtInput" className="text-gray-500">
                    District
                  </label>
                  <input
                    id="districtInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="Palakkad"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="placeInput" className="text-gray-500">
                    Place
                  </label>
                  <input
                    id="placeInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="Arinallur"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="pincodeInput" className="text-gray-500">
                    Pincode
                  </label>
                  <input
                    id="pincodeInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="678941"
                  />
                </div>
                
               
                <div className="flex flex-col">
                  <label htmlFor="employeeInput" className="text-gray-500">
                    Employee
                  </label>
                  <input
                    id="employeeInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="Nill"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="availableInput" className="text-gray-500">
                    Available
                  </label>
                  <input
                    id="availableInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    defaultValue="Nill"
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
          <Button variant="gradient" color="green" onClick={() => handleOpen(null)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Example;
