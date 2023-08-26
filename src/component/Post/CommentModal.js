import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';

const CommentModal = ({ postId, onClose }) => {
  const [commentText, setCommentText] = useState('');

  const localResponse = getLocal('authToken');
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const decoded = jwtDecode(localResponse)



  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/post/${postId}/comments/`);
      setComments(response.data);

      // // Filter user's comments from all comments
      // const userResponse = await axios.get(`${BASE_URL}/post/${postId}/user-comments/`, {
      //   headers: {
      //     Authorization: `Bearer ${localResponse}`,
      //   },
      // });
      // setUserComments(userResponse.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    if (!commentText.trim()) {
      console.log('Comment cannot be empty');
      return;
    }
  
    try {
      await axios.post(
        `${BASE_URL}/post/add-comment/`,
        { comment: commentText, user: decoded.user_id, post: postId },
        {
          headers: {
            Authorization: `Bearer ${localResponse}`,
          },
        }
      );
      setCommentText("");
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${BASE_URL}/post/delete-comment/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${localResponse}`,
        },
      });

      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[480px] max-h-[80vh] overflow-y-auto">
        <div className="px-2 mb-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">Comments</h2>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-medium">All Comments</h2>
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="flex space-x-2 items-start">
                <img
                  className="w-10 h-10 rounded-full"
                  src={BASE_URL + comment.userdetails.pic}
                  alt={`${comment.userdetails.username}'s Profile`}
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">
                        {comment.userdetails.username}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {comment.date} 
                      </span>
                    </div>
                    {comment.user === decoded.user_id && (
                      <button
                        className="text-red-500 hover:text-red-700 ml-2 focus:outline-none"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    )}
                    <p className="mt-1">{comment.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <textarea
          className="w-full border p-2 mt-4"
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            onClick={handleCommentSubmit}
          >
            Comment
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
