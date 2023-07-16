import React from 'react';
import ReviewItem from './ReviewItem';
import { Rating, Typography } from '@material-tailwind/react';
import ProfilePic from '../../../images/FARMER.jpg';

const Rate = () => {
  // Sample reviews data (you can replace this with your actual data)
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
  ];

  // State to track the selected rating and review message
  const [selectedRating, setSelectedRating] = React.useState(0);
  const [reviewMessage, setReviewMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any action you want with the selected rating and review message here
    console.log('Selected Rating:', selectedRating);
    console.log('Review Message:', reviewMessage);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">User Reviews</h2>
        {/* Render the user review list */}
        {reviews.map((review, index) => (
          <ReviewItem
            key={index}
            name={review.name}
            rating={review.rating}
            review={review.review}
            profilePic={ProfilePic} // Replace with the actual profile pic URL or image import
          />
        ))}
      </div>
      <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
        {/* Rating selection */}
        <div className="relative">
          <Rating
            value={selectedRating}
            onChange={(value) => setSelectedRating(value)}
          />
        </div>
        {/* Review message */}
        <div className="relative">
          <textarea
            rows="6"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Write your review..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
          disabled={selectedRating === 0 || reviewMessage.trim() === ''}
        >
          Send Review
        </button>
      </form>
    </div>
  );
};

export default Rate;
