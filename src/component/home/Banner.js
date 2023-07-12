import React from 'react';
import img3 from '../../images/farm.jpg';
import img2 from '../../images/agri2.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
    <div className='relative w-full'>
     
      <Carousel>
        <div>
          <img src={img3} />
          <p className="legend">New Innovation applied the in the aggriculture</p>
          
        </div>
        <div>
          <img src={img2} />
          <p className="legend bg-white">Legend 2</p>
        </div>
        
      </Carousel>




    </div>


  );
};

export default Banner;
