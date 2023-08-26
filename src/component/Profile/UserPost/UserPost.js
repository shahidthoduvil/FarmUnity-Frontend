import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import defaultImage from '../../../images/1kutzil5lj0nvfsf_1596544016.webp';
import AddPost from './AddPost'
import { FaSync } from 'react-icons/fa';

const UserPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // State to track selected post
  const token = getLocal();
  const { user_id } = jwtDecode(token);



  useEffect(() => {
    fetchUserPosts();
  }, [user_id]);

  const fetchUserPosts = async () => {
    try {
      setIsLoading(true); 
      const response = await axios.get(`${BASE_URL}/post/user-posts/${user_id}/`);
      setPosts(response.data);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setIsLoading(false);
    }
  };

  const openModal = (post) => {
    setSelectedPost(post); 
  };

  const closeModal = () => {
    setSelectedPost(null); 
  };

  const handleDeletePost = async (postId) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this post!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${BASE_URL}/post/delete/${postId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            if (response.status === 204) {
              fetchUserPosts();
              closeModal(); // Close the modal after deleting the post
            }
          }).catch((error) => {
            console.error('Error deleting post:', error);
          });
        }
      });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">

<div className="flex justify-end">
<button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={fetchUserPosts}
          disabled={isLoading}
        >
          {isLoading ? <span className="animate-spin">⏳</span> : <FaSync />}
         
        </button>
       
      </div>


      {posts.length === 0 ? (
        <div className="border border-gray-300 rounded-md overflow-hidden flex justify-center items-center">
          <img
            className="w-full h-64 object-cover"
            src={defaultImage}
            alt="Default"
          />
        </div>
      ) : (
        posts.map(post => (
          <div key={post.id} className="border border-gray-300 rounded-md overflow-hidden relative">
            <img
              className="w-full h-64 object-cover cursor-pointer"
              src={post.image}
              alt="Post"
              onClick={() => openModal(post)}
            />
          </div>
        ))
      )}
      <div className="col-span-3 flex justify-end mt-4">
        <AddPost action={fetchUserPosts} />
      </div>

      {selectedPost && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-99999">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <div className="flex items-center space-x-2 mb-4">
              <img
                className="w-10 h-10 rounded-full"
                src={selectedPost.user.pic}
                alt="User"
              />
              <div>
                <p className="font-semibold">{selectedPost.user.username}</p>
                <div className="flex space-x-2 text-gray-500">
                  <p className="truncate">{selectedPost.user.cat.Category_name},</p>
                  <p className="truncate">{selectedPost.user.Occup.titile}</p>
                </div>
                <p className="truncate">{selectedPost.Location}</p>
              </div>

            </div>
            <h3 className="text-xl font-semibold mt-2">{selectedPost.title}</h3>

            <img
              className="w-full h-64 object-cover mb-4"
              src={selectedPost.image}
              alt="Post"
            />
            <p className="text-gray-600 mt-1">{selectedPost.description}</p>
            <div className="p-4">


              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-red-500 text-white px-4 m-2 py-2 rounded-md"
                onClick={() => handleDeletePost(selectedPost.id)}
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default UserPost;
