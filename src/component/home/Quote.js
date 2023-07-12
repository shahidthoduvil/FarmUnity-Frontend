import React from 'react';

const Quote = () => {
  return (
 
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
                "Farming is a profession of hope."
              </blockquote>
              <p className="mt-4 text-gray-600">- Brian Brett</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
                "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways."
              </blockquote>
              <p className="mt-4 text-gray-600">- John F. Kennedy</p>
            </div>

           
          </div>
        </div>
      </div>
   
  );
};

export default Quote;
