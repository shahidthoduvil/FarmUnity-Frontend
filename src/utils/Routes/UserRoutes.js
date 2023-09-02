import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import FarmersPage from '../../pages/FarmersPage';
import Chat from '../../component/FARMER/Chat';
import ProfilePage from '../../component/Profile/Profile';
import Solution from '../../component/Solutions/Solution';
import ProfileSetup from '../../component/Profile/ProfileSetup';
import News from '../../component/News/News'
import UserProfile from '../../component/Profile/UserProfile';
import PostPage from '../../pages/PostPage';
import { useEffect } from 'react';


const UserRoutes = () => {


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
    <>
    
     
    </>
  )
}

export default UserRoutes