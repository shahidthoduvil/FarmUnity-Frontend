import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
export  default function AddPost({action}) {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const localResponse = getLocal('authToken');
 
  const decoded=jwtDecode(localResponse)

  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);

  const [newPostLocation, setNewPostLocation] = useState('');
 


  const handleAddPost = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newPostTitle);
      formData.append('description', newPostDescription);
      formData.append('Location',newPostLocation)
      formData.append('user', decoded.user_id);
      if (newPostImage) {
        formData.append('image', newPostImage);
      }
  
         axios.post(`${BASE_URL}/post/add-post/`, formData, {
        headers: {
          Authorization: `Bearer ${localResponse}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      closeDrawer();
    
      setNewPostTitle('');
      setNewPostDescription('');
      setNewPostLocation('');
      setNewPostImage(null);
      action()
      toast.success('post added successfully')
    } catch (error) {
      console.error('Error adding post:', error);
      toast.error('Error adding post:', error);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={openDrawer}>Add Post</Button>
      <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <ToastContainer/>
          <Typography variant="h5" color="blue-gray">
           Add Post
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <form className="flex flex-col gap-6 p-4" onSubmit={handleAddPost}>
          <Input type="text"
        
              label="Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)} />
          <Input ltype="text"
            
              label="Location" 
             value={newPostLocation}
              onChange={(e) => setNewPostLocation(e.target.value)} />
          <Textarea rows={6} 
          value={newPostDescription}
          
          onChange={(e) => setNewPostDescription(e.target.value)} />
          <Input type="file"
              accept="image/*"
              className="mb-4"
               
              onChange={(e) => setNewPostImage(e.target.files[0])} />
          <Button type='submit'>post</Button>
        </form>
      </Drawer>
    </React.Fragment>
  );
}