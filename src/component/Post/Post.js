// Post.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { getLocal } from '../../helpers/auth';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const localResponse = getLocal('authToken');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/post/posts/`)
     
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddPost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newPostTitle);
      formData.append('description', newPostDescription);
      if (newPostImage) {
        formData.append('image', newPostImage);
      }
      await axios.post(`${BASE_URL}/post/posts/`, formData)
     

      fetchPosts();
  
      setNewPostTitle('');
      setNewPostDescription('');
      setNewPostImage(null);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="bg-[#909e87]">
      {/* Add Post Option */}
      <div className="p-4">

        <div className="bg-white rounded-lg shadow-md p-4">
          <form onSubmit={handleAddPost}>
          <input
            type="text"
            className="w-full border p-2 mb-4"
            placeholder="Title"
       
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <textarea
            className="w-full h-20 border p-2 mb-4"
            placeholder="What's on your mind?"
          
            onChange={(e) => setNewPostDescription(e.target.value)}
          />
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
      {/* Existing Posts */}
      <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:flex-wrap justify-center">
        <div className="md:w-2/3 lg:w-2/5 p-5 md:px-12 md:py-8 h-full mx-auto">
          {posts.map((post) => (
            <div key={post.id} className="mb-4 border rounded-lg overflow-hidden shadow-md bg-white">
              <p className="text-gray-500 p-3">{post.title}</p>
              <img
                className="w-full h-64 object-cover rounded-t-lg"
                src={`${BASE_URL}${post.image}`}
                alt="Post"
              />
              <div className="p-5 text-xl text-gray-700 font-semibold">
                {post.description}
              </div>
              <div className="p-3 bg-gray-200 text-gray-700 text-sm">
                <span>Posted on {post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
