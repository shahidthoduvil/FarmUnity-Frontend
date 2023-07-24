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


export function Addbanner() {
  const [size, setSize] = React.useState(null);

  const handleOpen = (value) => setSize(value);

  const [quoteData, setQuoteData] = useState({
    content: '',
    Author: '',
    is_list: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setQuoteData({ ...quoteData, [name]: newValue });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formDataObj = new FormData();
    // formDataObj.append("title", formData.title);
    // formDataObj.append("img", formData.img);
    // formDataObj.append("is_list", formData.is_list);

    try {
      await axios.post(BASE_URL + "/home/banner/add/", quoteData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // If the creation was successful, you can show a success message or redirect to the banner list page.
      // For now, just close the dialog after successful submission.
      handleOpen(null);
    } catch (error) {
      console.error("Error creating Member:", error);
      // Handle the error and show an error message if needed.
    }
  }

  return (
    <>
      <div className="mb-3 flex gap-3">
        <Button onClick={() => handleOpen("sm")} variant="gradient">
          <FaPlusCircle />
        </Button>
      </div>
      <Dialog open={size === "sm"} size={size || "sm"} handler={handleOpen}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>Its a simple dialog.</DialogHeader>
          <DialogBody divider>

      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
        <textarea
          id="content"
          name="content"
          className="w-full p-2 border rounded"
          rows="4"
          value={quoteData.content}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
        <input
          type="text"
          id="author"
          name="Author"
          className="w-full p-2 border rounded"
          value={quoteData.Author}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="is_list" className="block text-gray-700 text-sm font-bold mb-2">
          Is List Quote:
        </label>
        <input
          type="checkbox"
          id="is_list"
          name="is_list"
          checked={quoteData.is_list}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Quote
      </button>
  
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => handleOpen(null)}
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



