



import React from 'react';
import { Rating } from '@material-tailwind/react';
import ProfilePic from '../../../images/FARMER.jpg';

const UserReview = ({ name, rating, review }) => (
  <div className="flex bg-white p-4 shadow-md rounded-md mb-4">
    <div className="flex-none mr-4">
      <img src={ProfilePic} alt={name} className="w-12 h-12 rounded-full object-cover" />
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <Rating value={rating} color="amber" />
      <p className="mt-1 text-gray-600">{review}</p>
    </div>
  </div>
);

const Rate= () => {
  const reviews = [
    {
      name: 'John Doe',
      rating: 4,
      review: 'Great product! I am very satisfied with my purchase.',
    },
    {
      name: 'Jane Smith',
      rating: 5,
      review: 'The best product ever! Highly recommended!',
    },
    // Add more reviews as needed
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">User Reviews</h2>
        {/* Render the user review list */}
        {reviews.map((review, index) => (
          <UserReview
            key={index}
            name={review.name}
            rating={review.rating}
            review={review.review}
          />
        ))}
      </div>
    </div>
  );
};

export default Rate;
