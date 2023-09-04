import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import img from '../../images/farm-community-high-resolution/farm-community-high-resolution-logo-black-on-transparent-background.png'

const NavbarLanding = () => {
    const navigate=useNavigate()
  return (
    <nav className="bg-[#788F69]">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
        <div className="flex items-center flex-shrink-0">
                        <img
                            src={img} // Update with the actual path to your logo image
                            alt="Farm Community Logo"
                            className="h-6 w-32" // Adjust the height and width as needed
                        />
                    </div>
            <div className="flex-1 flex justify-between sm:ml-6">
                <div className="flex space-x-4">
                    
                </div>
                <div className="flex items-center sm:ml-6">
               
                <button className="text-white font-medium hover:underline" onClick={()=>navigate('/login')}>
                  Login
                </button>
            
            </div>
            </div>
        </div>
    </div>


</nav>
);
}

export default NavbarLanding