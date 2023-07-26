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


const MemberEdit = ({id,action}) => {
    
    const [size, setSize] = useState(null);

    const handleOpen = () => setSize("sm");
    const handleClose = () => setSize(null);
    const [member, setMembers] = useState({
        title: '',
        img: null,
        is_list: false,
    });

    
    useEffect(() => {
        // Fetch the existing banner data from the backend
        axios.get(`${BASE_URL}/home/member/${id}/Edit/`)
            .then(response => setMembers(response.data))
            .catch(error => console.log(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMembers({ ...member, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setMembers({ ...member, img: file });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', member.title);
        formData.append('is_list', member.is_list);

        if (member.img) {
            formData.append('img', member.img, member.img.name);
        }

        // Send the updated banner data to the backend
        axios.put(`${BASE_URL}/home/member/${id}/Edit/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          
           
        })
        .then(response => console.log(response.data));

            handleClose()
            action()          
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
          <input type="text" name="title" value={member.title} onChange={handleChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <label>Is List:</label>
          <input type="checkbox" name="is_list" checked={member.is_list} onChange={handleChange} />
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
    </form>
  </Dialog>
  </>



   
  )
}

export default MemberEdit