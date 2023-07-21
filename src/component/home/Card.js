import React from 'react';
import img1 from '../../images/agri2.jpg'
import img2 from '../../images/FARMER.jpg'
import img3 from '../../images/mypaddy.jpg'
import ReactCardSlider from 'react-card-slider-component';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { useEffect,useState } from 'react';
const Card = () => {
const [cards,setCard]=useState([])




useEffect(()=>{
   getCard()
},[])


async function getCard(){
  try{
    const response=await axios.get(BASE_URL+'/home/member-list/')
    setCard(response.data)

  }catch(e){
  console.log(e)
  }
}

  return (
    
    <div>
      <h1 className="text-3xl font-bold text-center mt-6 mb-8">OUR COMMUNITY MEMBERS</h1>

      <div className="flex flex-wrap justify-center">
        {/* Card 1 */}
        {cards?.map((card)=>(
          <div className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 sm:px-4 mb-8 mt-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <img src={`${BASE_URL+card?.img}`} alt="Card 1 Photo" className="w-full h-40 sm:h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800 text-center ">{card?.title}</h2>
            </div>
          </div>
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default Card;
