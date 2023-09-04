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
    if (localResponse!=null) {
      const decoded = jwtDecode(localResponse);
      if (!decoded.is_setup_complete == true) {
        navigate('/profile-setup')
      }

      // If the user is not logged in, display an error message

      toast.loading('Please Login into your account', { duration: 2000 });
    }
    else{
      navigate('/login')
    }
  }, []);


  
 
  useEffect(() => {
    console.log('xfhgfhxh');
    const localResponse = getLocal();
    console.log(localResponse,'localresponse>>>>.');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (decoded.is_admin==true) {
        navigate('/adm')
      }
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