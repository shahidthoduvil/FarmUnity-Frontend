import React from 'react';
import { Rating } from '@material-tailwind/react';
import { FiEdit } from 'react-icons/fi';

const ReviewItem = ({ name, rating, review, profilePic }) => {
  const [rated, setRated] = React.useState(rating);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedRating, setEditedRating] = React.useState(rating);
  const [editedReview, setEditedReview] = React.useState(review);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedRating(rated);
    setEditedReview(review);
  };

  const handleSaveClick = () => {
    // You can perform any action you want with the edited rating and review here
    setRated(editedRating);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 mb-4 relative">
      <div className="flex items-center mb-2">
        {/* Rounded user profile pic */}
        <img
          src={profilePic}
          alt={`Profile of ${name}`}
          className="w-10 h-10 rounded-full mr-3"
        />
        <h3 className="text-lg font-bold">{name}</h3>
      </div>
      {isEditing && (
        // Display rating selection for editing
        <div className="absolute top-0 right-0 p-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-red-100 text-red-700 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            onClick={handleCancelClick}
          >
            <span className="sr-only">Cancel</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      {isEditing ? (
        // Display rating selection for editing
        <div className="flex flex-col gap-2 mb-1">
          <Rating value={editedRating} onChange={setEditedRating} />
          <textarea
            rows="3"
            value={editedReview}
            onChange={(e) => setEditedReview(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Write your review..."
          ></textarea>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 border border-transparent rounded-md bg-red-100 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-green-700 border border-transparent rounded-md bg-green-100 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        // Display rating with edit button
        <div className="flex items-center justify-between">
          <Rating value={rated} readOnly />
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 bg-white rounded-full shadow border border-gray-300 hover:bg-gray-50 focus:outline-none"
            onClick={handleEditClick}
          >
            <FiEdit className="w-5 h-5" />
          </button>
        </div>
      )}
      {/* Display review text */}
      <p>{review}</p>
    </div>
  );
};

export default ReviewItem;
