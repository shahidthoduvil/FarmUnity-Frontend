import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel, Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/config';
import './Banner.css'


const Banner = () => {
  const [banners, setBanner] = useState([]);

  useEffect(() => {
    getBanner();
  }, []);

  async function getBanner() {
    try {
      const response = await axios.get(BASE_URL + '/home/banner-list/');
      setBanner(response.data);
      console.log('athiyooo', response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="relative w-full h-96">
      <Carousel showThumbs={false} showIndicators={false} showStatus={false} autoPlay infiniteLoop interval={5000} className="rounded-xl h-full">
        {banners?.map((ban) => (
          <div key={ban.id} className="relative ">
            <img
              src={`${BASE_URL + ban?.img}`}
              alt={ban?.title}
              className="h-full w-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75 rounded-xl">
              <div className="w-3/4 text-center md:w-2/4">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  {ban?.title}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
