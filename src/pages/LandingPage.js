import React, { useEffect } from 'react'
import Banner from '../component/home/Banner'
import Quote from '../component/home/Quote'
import Footer from '../component/home/Footer'
import Card from '../component/home/Card'
import NavbarLanding from '../component/Navbar/NavbarLanding'
import LandingSubNavbar from '../component/Navbar/LandingSubNavbar'
import { getLocal } from '../helpers/auth'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

const navigate=useNavigate()

    useEffect(() => {
        const localResponse = getLocal('authToken');
        if (localResponse) {
          const decoded = jwtDecode(localResponse);
          console.log('Decoded from setup complete ::: ', decoded);
          if (!decoded.is_admin==true) {
            navigate('/')
          }
        }
      }, []);

      
  useEffect(() => {

    const localResponse = getLocal('authToken');
    if (localResponse) {
      navigate('/home')
    }
  }, []);

  return (
    <div className="flex flex-col max-h-screen">
         <NavbarLanding/>
      <div className="flex-grow">
        <LandingSubNavbar/>
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

export default LandingPage