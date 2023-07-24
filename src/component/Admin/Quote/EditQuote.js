// Assuming you already have a form to display and update a single quote
// Here, I am showing a simple example with a single quote

import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
  import { FaPlusCircle,FaEdit } from "react-icons/fa";
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';


const EditQuote = ({ id }) => {
const [size, setSize] = React.useState(null);

const handleOpen = () => setSize("sm");
const handleClose = () => setSize(null);


  const [quoteData, setQuoteData] = useState({
    content: '',
    Author: '',
    is_list: false,
  });


  useEffect(() => {
    
    axios.get(`${BASE_URL}/home/quote/update/${id}/`)
      .then((response) => {
        setQuoteData(response.data);
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
        // Handle any success message or redirection after quote update
      })
      .catch((error) => {
        console.error('Error updating quote:', error);
        // Handle any error message or error handling here
      });
  };

  return (
  

<>
<div className="mb-3 flex gap-3">
  <Button onClick={handleOpen} variant="gradient">
  <FaEdit/> 
  </Button>
</div>
<Dialog open={size === "sm"} size={size || "sm"} onClose={handleClose}>
  <form onSubmit={handleUpdate}>
    <DialogHeader>Add the Quote.</DialogHeader>
    <DialogBody divider>
      <div className="md:grid grid-cols-1 gap-6">
      <div>
        <label>Quote:</label>
        <input
          type="text"
          name="content"
          value={quoteData.content}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="Author"
          value={quoteData.Author}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Is List:</label>
        <input
          type="checkbox"
          name="is_list"
          checked={quoteData.is_list}
          onChange={(e) => setQuoteData({ ...quoteData, is_list: e.target.checked })}
        />
      </div>
      </div>
    </DialogBody>
    <DialogFooter>
      <Button
        variant="text"
        color="red"
        onClick={handleClose} // Close the dialog if the "Cancel" button is clicked
        className="mr-1"
      >
        <span>Cancel</span>
      </Button>
      <Button variant="gradient" color="green" type="submit">
      update
      </Button>
    </DialogFooter>
  </form>
</Dialog>
</>
  );
};

export default EditQuote;
