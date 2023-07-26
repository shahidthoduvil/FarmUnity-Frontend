import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../utils/config';

const Quote = () => {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    getQuotes()
  },[])


  async function getQuotes() {
    try {
      const response = await axios.get(BASE_URL + '/home/quote-list')
      setQuotes(response.data)

    } catch (e) {
      console.log(e);
    }

  }
  return (
    <>
    <h1 className="text-3xl font-bold text-center mt-6 mb-8">
        THE DAILY QUOTES
      </h1>
      {quotes?.map((quote)=>(
    <div className="bg-white py-8 flex justify-center items-center">

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
         
          <div className="p-6 sm:p-8 md:p-10" key={quote.id}>
            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-center">
              {quote.content}
            </blockquote>
            <p className="mt-4 text-gray-600 text-center">- {quote.Author}</p>
          </div>
    

        </div>
         

      </div>
       
    </div>
    ))}
    </>


  );
};

export default Quote;
