import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

const EditQuote = ({ id, action }) => {
  const [size, setSize] = useState(null);

  const handleOpen = () => setSize("sm");
  const handleClose = () => setSize(null);

  const [quoteData, setQuoteData] = useState({
    content: '',
    Author: '',
    is_list: false,
  });

  useEffect(() => {
    // Fetch the quote data when the component mounts
    axios.get(`${BASE_URL}/home/quote/update/${id}/`)
      .then((response) => {
        setQuoteData(response.data); // Set the fetched data as initial state
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuoteData({
      ...quoteData,
      [name]: value,
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`${BASE_URL}/home/quote/update/${id}/`, quoteData)
      .then((response) => {
        console.log('Quote updated successfully:', response.data);
        handleClose();
        action()
       // Assuming "action" is a function passed as a prop to update the quotes list
      })
      .catch((error) => {
        console.error('Error updating quote:', error);
      });
  };

  return (
    <>
      <div className="mb-3 flex gap-3">
        <Button onClick={handleOpen} color="lightBlue" ripple="dark">
          <FaEdit />
        </Button>
      </div>
      <Dialog open={size === "sm"} size={size || "sm"} onClose={handleClose}>
        <form onSubmit={handleUpdate}>
          <DialogHeader>Edit the quote</DialogHeader>
          <DialogBody divider>
            <div className="md:grid grid-cols-1 gap-6">
              <div>
                <label className="text-gray-600">content:</label>
                <input
                  type="text"
                  size={50}
                  width={50}
                  height={300}
                  name="content"
                  value={quoteData.content}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-gray-600">Author:</label>
                <input
                  type="text"
                  name="Author"
                  value={quoteData.Author}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-gray-600">Is List:</label>
                <input
                  type="checkbox"
                  name="is_list"
                  checked={quoteData.is_list}
                  onChange={(e) =>
                    setQuoteData({ ...quoteData, is_list: e.target.checked })
                  }
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              color="red"
              onClick={handleClose}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button color="green" type="submit">
              Update
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default EditQuote;
