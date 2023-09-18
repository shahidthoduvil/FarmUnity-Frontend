import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import CommentModal from './CommentModal';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaSync } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostLocation, setNewPostLocation] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');

  const localResponse = getLocal('authToken');
  const navigate = useNavigate();

  const token = getLocal();
  const { user_id } = jwtDecode(token);
  const decoded = jwtDecode(localResponse);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/post/posts/${user_id}/`);
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Error fetching posts:', error);
      setIsLoading(false);
    }
  };

  const handleAddPost = async (event) => {
    event.preventDefault();
    setTitleError('');
    setDescriptionError('');
    setLocationError('');

    let isValid = true;

    if (!newPostTitle.trim()) {
      setTitleError('Title is required');
      isValid = false;
    }

    if (!newPostDescription.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    }

    if (!newPostLocation.trim()) {
      setLocationError('Location is required');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newPostTitle);
      formData.append('description', newPostDescription);
      formData.append('Location', newPostLocation);
      formData.append('user', decoded.user_id);

      if (newPostImage) {
        formData.append('image', newPostImage);
      }

      const response = await axios.post(`${BASE_URL}/post/add-post/`, formData, {
        headers: {
          Authorization: `Bearer ${localResponse}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        setNewPostTitle('');
        setNewPostDescription('');
        setNewPostLocation('');
        setNewPostImage(null);
        toast.success('Post added successfully');
      }

      fetchPosts();
    } catch (error) {
      toast.error('Error adding post');
      console.error('Error adding post:', error);
    }
  };

  const handleLike = async (postId, isLiked) => {
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
          fetchPosts();
        }
        toast.success('You liked the post');
      } else {
        const response = await axios.delete(
          `${BASE_URL}/post/un-like-post/${postId}/${user_id}/`
        );
        if (response.status === 204) {
          fetchPosts();
        }
        toast.success('You unliked the post');
      }
    } catch (error) {
      console.error('Error performing like/unlike:', error);
      toast.error('Like/unlike error');
    }
  };

  const handleComment = (postId) => {
    setSelectedPostId(postId);
  };

  const handleCloseCommentModal = () => {
    setSelectedPostId(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/post/delete/${postId}/`, {
        headers: {
          Authorization: `Bearer ${localResponse}`,
        },
      });

      if (response.status === 200) {
        await fetchPosts();
      }
      toast.success('You deleted the post');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post');
    }
  };

  return (
    <div className="bg-[#909e87]">
      <ToastContainer />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <form onSubmit={handleAddPost}>
            <input
              type="text"
              className={`w-full border p-2 mb-4 ${titleError ? 'border-red-500' : ''}`}
              placeholder="Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            {titleError && <div className="text-red-500">{titleError}</div>}
            <textarea
              className={`w-full h-20 border p-2 mb-4 ${descriptionError ? 'border-red-500' : ''}`}
              placeholder="What's on your mind?"
              value={newPostDescription}
              onChange={(e) => setNewPostDescription(e.target.value)}
            />
            {descriptionError && <div className="text-red-500">{descriptionError}</div>}
            <input
              type="text"
              className={`w-full border p-2 mb-4 ${locationError ? 'border-red-500' : ''}`}
              placeholder="Location"
              value={newPostLocation}
              onChange={(e) => setNewPostLocation(e.target.value)}
            />
            {locationError && <div className="text-red-500">{locationError}</div>}
            <input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={(e) => setNewPostImage(e.target.files[0])}
            />

            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                type='submit'
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>



      <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:flex-wrap justify-center">

        <div className="md:w-2/3 lg:w-2/5 p-5 md:px-12 md:py-8 h-full mx-auto">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={fetchPosts}
            disabled={isLoading}
          >
            {isLoading ? <span className="animate-spin">⏳</span> : <FaSync />}
          </button>

          {
            posts.length === 0 ? (



              <div className="mt-4 text-gray-500 ">

                No posts available. Be the first to post something!

              </div>
            ) : (

              posts.map((post) => (
                <div key={post.id} className="mb-4 border rounded-lg overflow-hidden shadow-md bg-white">

                  <div className="p-3">
                    <div className="flex items-center space-x-2" onClick={() => navigate(`/user-profile/${post.user.username}`)}>
                      <img
                        className="w-10 h-10 rounded-full mr-2"
                        src={post.user.pic}
                        alt="Profile"
                      />
                      <div>
                        <p className="font-semibold">{post.user.username}</p>
                        <div className="flex space-x-2 text-gray-500">
                          <p className="truncate">{post.user.cat.Category_name},</p>
                          <p className="truncate">{post.user.Occup.titile}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-1 text-gray-500">
                      <svg className="w-4 h-4 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18.01c-4.752 0-8.614-3.862-8.614-8.614 0-4.751 3.862-8.614 8.614-8.614 4.751 0 8.614 3.863 8.614 8.614 0 4.752-3.863 8.614-8.614 8.614zm1.147-8.607a.8.8 0 00.103-.01l2.645-.506-.477 2.71a.8.8 0 00.179.715l1.931 1.931-2.889.376a.8.8 0 00-.539.324l-1.358 1.947-1.333-2.167a.8.8 0 00-.672-.372L8.81 12.2l.167-2.828a.8.8 0 00-.7-.788l-2.828-.168L7.054 5.3a.8.8 0 00.37-.672l1.333-2.167 2.19-.296a.8.8 0 00.648-.55l.489-2.775 2.632.476a.8.8 0 00.715-.178l1.93-1.93-2.91.379a.8.8 0 00-.537.34L11.91 4.8 10.53 2.655a.8.8 0 00-.762-.453.8.8 0 00-.454.244L6.924 5.3l-1.932-.08a.8.8 0 00-.72.562L3.184 8.17l-2.19-.296a.8.8 0 00-.552 1.07L1.877 12.2l-2.643.506a.8.8 0 00.674.9.8.8 0 00.262.044l2.91-.38 2.168 1.332a.8.8 0 00.717.182l2.637-.477.01.01a.8.8 0 00.54-1.33l-1.356-1.952.376-2.886a.8.8 0 00.324-.54l1.932-1.932-2.91.379a.8.8 0 00-.536.322L21.2 11.9l-1.952-1.36a.8.8 0 00-.54-.324L16.836 8.16l-1.33-2.17a.8.8 0 00-.673-.37L12 5.157l-2.167-.296a.8.8 0 00-.556.65L8.107 8.16 5.925 8.464a.8.8 0 00-.542.324l-1.36 1.953-2.886-.375a.8.8 0 00-.538.319l-.01.011-1.953 1.357L3.8 13.642a.8.8 0 00.34.536l2.635 1.43-.377 2.91a.8.8 0 00.178.718.8.8 0 00.51.182l2.91-.377 1.948 1.932a.8.8 0 00.715.179l2.637-.477.507 2.643a.8.8 0 001.34.278l1.433-2.19 2.886-.376a.8.8 0 00.557-1.344L20.1 15.672l1.932-.08a.8.8 0 00.719-.554l.298-2.167 2.195-.297a.8.8 0 00.45-1.093l-1.952-1.357zm-.47 2.238a4.8 4.8 0 11-9.6 0 4.8 4.8 0 019.6 0z" />
                      </svg>
                      <span>{post.Location}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 p-3">{post.title}</p>
                  <img
                    className="w-full h-64 object-cover rounded-t-lg"
                    src={post.image}
                    alt="Post"
                  />
                  <div className="p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <button
                        className={`flex items-center text-gray-500 m-3 hover:text-blue-500 transition-colors ${post.is_liked ? 'text-blue-500' : ''
                          }`}
                        onClick={() => handleLike(post.id, post.is_liked)}
                      >
                        <div className="relative flex items-center">
                          <span
                            className={`mr-1 text-xs ${post.is_liked ? 'text-blue-500 bg-blue-100' : 'text-green-900 bg-green-100'
                              }`}
                          >
                            {post.like_count}
                          </span>
                          <FaThumbsUp
                            className={`w-5 h-5 ${post.is_liked ? 'text-blue-500' : 'mr-1'}`}
                          />
                          <span className={`ml-1 ${post.is_liked ? 'text-blue-500' : ''}`}>
                            {post.is_liked ? 'Liked' : 'Like'}
                          </span>
                        </div>
                      </button>

                    </div>
                    <button
                      className="flex items-center text-gray-500 m-3 hover:text-blue-500 transition-colors"
                      onClick={() => handleComment(post.id)}
                    >
                      <div className="relative flex items-center">
                        <span className="mr-1 text-xs text-green-900 bg-green-100">
                          {post.comment_count}
                        </span>
                        <FaComment className="w-5 h-5 mr-1" />
                        <span> comments</span>
                      </div>
                    </button>
                    {decoded.user_id === post.user.id && (
                      <button
                        className="flex items-center text-red-500 hover:text-red-700 transition-colors"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <FaTrash className="w-5 h-5 mr-1" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                  <div className="p-5 text-xl text-gray-700 font-semibold">
                    {post.description}
                  </div>


                  <div className="p-3 bg-gray-200 text-gray-700 text-sm">
                    <span>Posted on {new Date(post.date).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</span>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
      {selectedPostId && (
        <CommentModal postId={selectedPostId} onClose={handleCloseCommentModal} />
      )}
    </div>
  );
};

export default Post;

