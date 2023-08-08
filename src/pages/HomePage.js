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




const HomePage = () => {
  const navigate=useNavigate
  const localResponse = localStorage.getItem('authToken');

  // const checkProfileSetupStatus = async () => {
  //   try {
    
      
  //     if (!localResponse) {
       
  //       navigate('/login');
  //       return;
  //     }
  //     const decoded=jwtDecode(localResponse)
  //     if( decoded.is_setup_complete){
  //       navigate('/')
  //     }
  //     else
  //     navigate('/profile-setup')


      
  //   } catch (error) {
  //     console.error('Error checking profile setup status:', error);
  //     toast.error('Failed to check profile setup status.');
  //   }
  // };

  // useEffect(() => {
  //   checkProfileSetupStatus();
  // }, []);

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