import React, { useState, useEffect } from 'react';
import { Rating } from '@material-tailwind/react';

import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';

const Rate = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState('');
  const token = getLocal();
  const { user_id } = jwtDecode(token);

  useEffect(() => {
    fetch(`${BASE_URL}/home/${user_id}/reviews/`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any action you want with the selected rating and review message here
    console.log('Selected Rating:', selectedRating);
    console.log('Review Message:', reviewMessage);
  };

  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <div className="flex items-center mb-2">
              <img
                src={BASE_URL + review.user.pic}
                alt="User Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-lg">{review.user.username}</p>
                <p className="text-sm text-gray-500">
                {review.user.Occup.titile}
                </p>
                <p className="text-sm text-gray-500">
                {review.user.cat.Category_name}
                </p>
              </div>
            </div>
            <div className="mb-2">
            </div>
            <p className="text-gray-700">{review.message}</p>
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default Rate;
