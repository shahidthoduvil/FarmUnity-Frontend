import React from 'react'
import Navbar from '../component/Navbar/Navbar'
import SubNavbar from '../component/Navbar/SubNavbar'
import Banner from '../component/home/Banner'
import Card from '../component/home/Card'
import Quote from '../component/home/Quote'
import Footer from '../component/home/Footer'


const HomePage = () => {
  return (
    

    <div className="flex flex-col max-h-screen">
    <Navbar />
    <div className="flex-grow">
      <SubNavbar />
      <Banner />
      <Quote />
      </div>
        <div className="">
        <Card  />
        </div>
   
   
    <Footer />
  </div>
   



  )
}

export default HomePage