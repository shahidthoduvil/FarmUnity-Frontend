import React from 'react'
import Post from '../component/Post/Post'
import { useNavigate } from 'react-router-dom';
import { getLocal } from '../helpers/auth';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
const PostPage = () => {

    const navigate=useNavigate()
 
  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (decoded.is_admin==true) {
        navigate('/adm')
      }
    }
  }, []);

  return (
    <div><Post/></div>
  )
}

export default PostPage