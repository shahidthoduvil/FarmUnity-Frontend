import React from 'react';

const Quote = () => {
  return (
 
    <div className="bg-white py-8 flex justify-center items-center">
  <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 sm:p-8 md:p-10">
        <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-center">
          "Farming is a profession of hope."
        </blockquote>
        <p className="mt-4 text-gray-600 text-center">- Brian Brett</p>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-lg overflow- mt-3">
      <div className="p-6 sm:p-8 md:p-10">
        <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-center">
        "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways."
        </blockquote>
        <p className="mt-4 text-gray-600 text-center">- John F. Kennedy</p>
      </div>
    </div>
  </div>
</div>

   
  );
};

export default Quote;
