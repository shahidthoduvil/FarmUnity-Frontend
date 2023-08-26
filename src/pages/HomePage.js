import React, { useEffect } from 'react'
import Navbar from '../component/Navbar/Navbar'
import SubNavbar from '../component/Navbar/SubNavbar'
import Banner from '../component/home/Banner'
import Card from '../component/home/Card'
import Quote from '../component/home/Quote'
import Footer from '../component/home/Footer'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react'
import { getLocal } from '../helpers/auth'





const HomePage = () => {
  const navigate = useNavigate();
  
  const [user,setUser]=useState('')
  
  
  useEffect(() => {
    const localResponse = getLocal('authToken');
    console.log('local response from login ::.>> ', localResponse);
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      if (decoded.is_setup_complete == true) {
        navigate('/')
      }
      else{
        navigate('/profile-setup')
      }

      // If the user is not logged in, display an error message
      toast.loading('Please Login into your account', { duration: 2000 });
    }
    else{
      navigate('/login')
    }
  }, []);
  


  return (
    <div className="flex flex-col max-h-screen">
      <Navbar />
      <div className="flex-grow">
        <SubNavbar />
        <Banner />
        <Quote />
      </div>
      <div className="">
        <Card />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage