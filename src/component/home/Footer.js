import React from 'react'

const Footer = () => {
  return (
   
        


    <footer className="bg-[#788F69] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-white text-center mb-4">
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-white text-center mb-4">
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <p>123-456-7890</p>
            <p>info@example.com</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-white text-center mb-4">
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex justify-center">
              <a href="#" className="mr-2 text-white hover:text-gray-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="mr-2 text-white hover:text-gray-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="mr-2 text-white hover:text-gray-400">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>



    
  )
}

export default Footer