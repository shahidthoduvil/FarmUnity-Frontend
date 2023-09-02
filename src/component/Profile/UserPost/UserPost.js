import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import defaultImage from '../../../images/1kutzil5lj0nvfsf_1596544016.webp';
import AddPost from './AddPost'
import { FaThumbsUp, FaComment, FaTrash } from 'react-icons/fa';
import CommentModal from './CommentModal';

const UserPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const token = getLocal();
  const { user_id } = jwtDecode(token);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/post/user-posts/${user_id}/`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  
  useEffect(() => {
    fetchUserPosts();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };


  const handleCommentUserPost = (postId) => {
    setSelectedPostId(postId);
  };

  const handleCloseCommentModalUserPost = () => {
    setSelectedPostId(null);
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
              closeModal();
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

  const handleLikeUserPost = async (postId, isLiked) => {
    console.log(isLiked, 'isLiked>>>>.');
    try {
      if (!isLiked) {

        const response = await axios.post(
          `${BASE_URL}/post/like-post/`,
          {
            user: user_id,
            post: postId,
          }

        );
        if (response.status === 200 || response.status === 201) {
          fetchUserPosts();
        }
      } else {
        console.log('unliked');
        const response = await axios.delete(
          `${BASE_URL}/post/un-like-post/${postId}/${user_id}/`
        );
        console.log('unliked');
        if (response.status === 204) {
          fetchUserPosts()        }
      }

    } catch (error) {
      console.error('Error performing like/unlike:', error);
    }
  };




  

  return (
    <div className="grid grid-cols-3 gap-4">
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
                src={ selectedPost.user.pic}
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

            <div className="flex items-center p-3 justify-between">
              <button
                className={`flex items-center text-gray-500 m-3 hover:text-blue-500 transition-colors ${selectedPost.is_liked ? 'text-blue-500' : ''}`}
                onClick={() => handleLikeUserPost(selectedPost.id, selectedPost.is_liked)}
              >
                <div className="relative flex items-center">
                  <span className={`mr-1 text-xs ${selectedPost.is_liked ? 'text-blue-500 bg-blue-100' : 'text-green-900 bg-green-100'}`}>
                    {selectedPost.like_count}
                  </span>
                  <FaThumbsUp className={`w-5 h-5 ${selectedPost.is_liked ? 'text-blue-500' : 'mr-1'}`} />
                  <span className={`ml-1 ${selectedPost.is_liked ? 'text-blue-500' : ''}`}>
                    {selectedPost.is_liked ? 'Liked' : 'Like'}
                  </span>
                </div>
              </button>
              <button
                className="flex items-center text-gray-500 m-3 hover:text-blue-500 transition-colors"
                onClick={() => handleCommentUserPost(selectedPost.id)}
              >
                <div className="relative flex items-center">
                  <span className="mr-1 text-xs text-green-900 bg-green-100">
                    {selectedPost.comment_count}
                  </span>
                  <FaComment className="w-5 h-5 mr-1" />
                  <span> comments</span>
                </div>
              </button>
            </div>

    
            {selectedPostId && (
              <div className="absolute inset-0 bg-black bg-opacity-50 z-9999 flex justify-center items-center">
                <CommentModal postId={selectedPostId} onClose={handleCloseCommentModalUserPost} />
              </div>
            )}
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
