import React, { useEffect, useState } from 'react'

import axios from 'axios';

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { BASE_URL } from '../../../utils/config';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BannerEdit = ({id,action}) => {
  
    const [size, setSize] = useState(null);

    const handleOpen = () => setSize("sm");
    const handleClose = () => setSize(null);
    const [banner, setBanner] = useState({
        title: '',
        img: null,
        is_list: false,
    });


    useEffect(() => {
        // Fetch the existing banner data from the backend
        axios.get(`${BASE_URL}/home/banner/${id}/Edit`)
            .then(response => setBanner(response.data))
            .catch(error => console.log(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBanner({ ...banner, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBanner({ ...banner, img: file });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', banner.title);
      formData.append('is_list', banner.is_list);
  
      if (banner.img) {
          formData.append('img', banner.img, banner.img.name);
      }
  
      // Send the updated banner data to the backend
      axios.put(`${BASE_URL}/home/banner/${id}/Edit`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
      .then(response => {
          console.log(response.data);
          handleClose();
          action();
          toast.success('Banner edited successfully')
      })
      .catch(error => {

          console.error('Error:', error);
          toast.error('Error editing the banner');
      });
  };
  
    return (
        <>
      
    <div className="mb-3 flex gap-3">
    <Button  onClick={handleOpen}  variant="gradient">
      < FaEdit/>
    </Button>
  </div>
  <Dialog open={size === "sm"} size={size || "sm"} handler={handleOpen}>
    <form onSubmit={handleSubmit}>
      <DialogHeader>Edit the banner</DialogHeader>
      <DialogBody divider>
        <div className="md:grid grid-cols-1 gap-6">
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={banner.title} onChange={handleChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <label>Is List:</label>
          <input type="checkbox" name="is_list" checked={banner.is_list} onChange={handleChange} />
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
          <span>Edit</span>
        </Button>
      </DialogFooter>
      <ToastContainer/>
    </form>
  </Dialog>
  </>

    )
}

export default BannerEdit