import React, { useState, useEffect } from 'react';
import { Rating } from '@material-tailwind/react';
import axios from 'axios';

import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rate2 = ({usernam}) => {
  const [reviews, setReviews] = useState([]);
  const [rate, setRate] = useState(0);
  const [message, setMessage] = useState('');

  const token = getLocal();
  const { user_id } = jwtDecode(token);


  const [user1_id, setUser_id] = useState(null);

const fetchReviews = () => {
  axios.get(`${BASE_URL}/home/${usernam}/singlereview/`)
    .then(response => {
      console.log(response.data); 
      setReviews(response.data);
    })
    .catch(error => {
      console.error('Error fetching reviews:', error);
      toast.error('Error fetching reviews')
    });
};



  useEffect(() => {
    fetchReviews();
  }, [usernam]);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/home/create-review/`,{
      message: message,
      rate: rate,
      user:user_id,
      username:usernam,

    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(response => {
        fetchReviews()
        console.log('Review added successfully:', response.data);
        toast.success('Review added successfully')
      
        setRate(0);
        setMessage('');
        

      })
      .catch(error => {
       
        console.error('Error adding review:', error);
        toast.error('Error adding review:');
      });

  };

  const handleDelete = (reviewId) => {

      axios.delete(`${BASE_URL}/home/${reviewId}/delete-review/`)      .then(response => {
        if (response.status === 204) {
          fetchReviews()
          toast.success('Review deleted successfully')
        }
      })
      .catch(error => {
        console.error('Error deleting question:', error);
        toast.error('Error deleting question:');

      });
  };
    

  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <ToastContainer/>
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
        {review.user.id === user_id && (
  <button onClick={() => handleDelete(review.id)}>
          <FontAwesomeIcon icon={faTimesCircle} className="text-lg" />
  </button>
)}
          </div>
        ))}
      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label className="block font-semibold">Review Message</label>
          <textarea
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Write your review..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Add Review
        </button>
      </form>
      </div>
    </div>
  );
};

export default Rate2;
