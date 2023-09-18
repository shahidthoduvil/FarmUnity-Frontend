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

export function Addbanner({action}) {
  const [size, setSize] = React.useState(null);

  const handleOpen = () => setSize("sm");
  const handleClose = () => setSize(null);

  const [formData, setFormData] = useState({
    title: "",
    img: null,
    is_list: false,
  });

  const handleChange = (e) => {
    console.log(e.target.files);
    const { name, value, type, checked, files } = e.target;

    console.log("Name:", name);
    console.log("Value:", value);
    console.log("Type:", type);
    console.log("Checked:", checked);
    console.log("Files:", files);

    // For file inputs, access the file data using e.target.files
    const fieldValue = type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("img", formData.img);
    formDataObj.append("is_list", formData.is_list);

    try {
      await axios.post(BASE_URL + "/home/banner/add/", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleClose()
      action()
      toast.success('Banner added successfully')
    
    } catch (error) {
      console.error("Error add member:", error);
      toast.error("Error adding  member");

    }
  };

  return (
    <>
      <div className="mb-3 flex gap-3">
        <Button onClick={handleOpen}  variant="gradient">
          <FaPlusCircle />
        </Button>
      </div>
      <Dialog open={size === "sm"} size={size || "sm"} handler={handleOpen}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>Its a simple dialog.</DialogHeader>
          <DialogBody divider>
            <ToastContainer/>
            <div className="md:grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="text-gray-600">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
              
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="img" className="text-gray-600">
                  Image:
                </label>
                <input
                  type="file"
                  id="img"
                  name="img"
           
                  onChange={handleChange}
                  accept="image/*"
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
              onClick={handleClose}
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
