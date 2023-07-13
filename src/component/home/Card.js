import React from 'react';
import img1 from '../../images/agri2.jpg'
import img2 from '../../images/FARMER.jpg'
import img3 from '../../images/mypaddy.jpg'
import ReactCardSlider from 'react-card-slider-component';

const Card = () => {
  return (
    
    <div>
      <h1 className="text-3xl font-bold text-center mt-6 mb-8">OUR COMMUNITY MEMBERS</h1>
      <div className="flex flex-wrap justify-center">
        {/* Card 1 */}
        <div className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 sm:px-4 mb-8 mt-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <img src={img1} alt="Card 1 Photo" className="w-full h-40 sm:h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800">Card 1 Title</h2>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 sm:px-4 mb-8 mt-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <img src={img2} alt="Card 2 Photo" className="w-full h-40 sm:h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800">Card 2 Title</h2>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 sm:px-4 mb-8 mt-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <img src={img3} alt="Card 3 Photo" className="w-full h-40 sm:h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800">Card 3 Title</h2>
            </div>
          </div>
        </div>
        <div className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 sm:px-4 mb-8 mt-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <img src={img3} alt="Card 3 Photo" className="w-full h-40 sm:h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800">Card 3 Title</h2>
            </div>
          </div>
        </div>
        <div className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 sm:px-4 mb-8 mt-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <img src={img3} alt="Card 3 Photo" className="w-full h-40 sm:h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800">Card 3 Title</h2>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Card;
