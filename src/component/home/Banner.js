import React from 'react';
import img3 from '../../images/farm.jpg';
import img2 from '../../images/agri2.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
import { useEffect,useState } from 'react';
import { BASE_URL } from '../../utils/config';




const Banner = () => {

  const [banners,setBanner]=useState([]);

  useEffect(()=>{
    getBanner()
  },[])

  async function getBanner(){
    try{
      const response=await axios.get(BASE_URL + '/home/banner-list/')
      setBanner(response.data)
      console.log('athiyooo',response);
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div className='relative w-full'>


   
      <Carousel>
      {banners?.map((ban)=>(
        <div key={ban.id}> 
          <img src={`${BASE_URL+ban?.img}`} />
          <p className="legend">{ban?.title}</p>
          
        </div>
        ))}
      </Carousel>

    </div>
  );
};

export default Banner;
