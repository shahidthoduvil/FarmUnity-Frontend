import React from 'react'
import logo from '../../images/farm-community-high-resolution/farm-community-high-resolution-logo-black-on-transparent-background.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
   
        

    <footer className="bg-[#788F69] py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-white text-center mb-4">
          <h3 className="text-lg font-bold mb-2">Farm Community</h3>
          <p>conneting the farmers</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-white text-center mb-4">
          <h3 className="text-lg font-bold mb-2">Contact</h3>
          <p>123-456-7890</p>
          <p>farmcommunity85@gmail.com</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-white text-center mb-4">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex justify-center">
    <Link to='/home' className="mr-2 text-white hover:text-gray-400">
      <FontAwesomeIcon icon={faFacebookF} />
    </Link>
    <Link to= '/home'className="mr-2 text-white hover:text-gray-400">
      <FontAwesomeIcon icon={faTwitter} />
    </Link>
    <Link to='/home' className="mr-2 text-white hover:text-gray-400">
      <FontAwesomeIcon icon={faInstagram} />
    </Link>
    <Link 
 to='/home' className="mr-2 text-white hover:text-gray-400">
      <FontAwesomeIcon icon={faWhatsapp} />
    </Link>
  </div>
        </div>
      </div>
      {/* Add the logo image */}
      <div className="flex justify-center">
        <img src={logo} alt="Farm Community Logo" className="h-5 w-32" />
      </div>
    </div>
  </footer>


    
  )
}

export default Footer