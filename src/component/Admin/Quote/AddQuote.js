import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function AddQuote({action}) {
  const [size, setSize] = React.useState(null);

  const handleOpen = () => setSize("sm");
  const handleClose = () => setSize(null);

  const [formData, setFormData] = useState({
    content: "",
    Author: "",
    is_list: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
   
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("content", formData.content);
    formDataObj.append("Author", formData.Author);
    formDataObj.append("is_list", formData.is_list);

    try {
      await axios.post(BASE_URL + '/home/quote/add/', formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
       
      });
  
      handleClose(); 
      action()
      toast.success('Quote added successfully')
    } catch (error) {
      console.error("Error creating quote:", error);
      toast.error('Error creating quote')
    }
  };

  return (
    <>
      <div className="mb-3 flex gap-3">
        <Button onClick={handleOpen} variant="gradient">
          <FaPlusCircle />
        </Button>
      </div>
      <Dialog open={size === "sm"} size={size || "sm"} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>Add the Quote.</DialogHeader>
          <DialogBody divider>
            <ToastContainer/>
            <div className="md:grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="content" className="text-gray-600">
                  Content:
                </label>
                <input
                  type="text"
                  id="content"
                  name="content"
                 
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="Author" className="text-gray-600">
                  Author:
                </label>
                <input
                  type="text"
                  id="Author"
                  name="Author"
               
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label>List:</label>
                <input
                  type="checkbox"
                  name="is_list"
                  checked={formData.is_list}
                  onChange={handleChange}
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
              <span>ADD</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
