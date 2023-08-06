import React, { useState } from 'react';
import { Picker } from 'emoji-mart';
import img from '../../images/farm.jpg';
import userProfileImage from '../../images/FARMER.jpg'; // Replace with the actual image file
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Post = () => {
  const [comment, setComment] = useState('');

  // Sample data for multiple posts (replace with actual data from your backend)
  const posts = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        location: 'Location 1, Country 1',
        profileImage: userProfileImage,
      },
      content: 'A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.',
    },
    {
      id: 2,
      user: {
        name: 'Jane Doe',
        location: 'Location 2, Country 2',
        profileImage: userProfileImage,
      },
      content: 'Another awesome photo from the beach. Photo by @username on Unsplash.',
    },
    // Add more posts here
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:flex-wrap justify-center">
      <div className="md:w-2/3 lg:w-2/5 p-5 md:px-12 md:py-8 h-full mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="mb-4 border rounded-lg overflow-hidden shadow-md">
            {/* User Profile */}
            <div className="flex items-center space-x-4 p-4 bg-white">
              <div className="relative rounded-full w-14 h-14 overflow-hidden">
                <img
                  src={post.user.profileImage}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                  title="Online"
                ></div>
              </div>
              <div>
                <p className="text-xl font-semibold">{post.user.name}</p>
                <p className="text-gray-500">{post.user.location}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="bg-white">
              <img
                className="w-full h-64 object-cover rounded-t-lg"
                src={img}
                alt="Post"
              />
              
              <div className="p-2 flex justify-between border-t">
                <button className="w-1/3 text-center text-xl text-gray-700 font-semibold hover:bg-gray-200">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button className="w-1/3 border-l border-r text-center text-xl text-gray-700 font-semibold hover:bg-gray-200">
                  <FontAwesomeIcon icon={faComment} />
                </button>
              </div>
              <div className="p-5 text-xl text-gray-700 font-semibold">
                {post.content}
              </div>
              <div className="p-5 text-xl text-gray-700 font-semibold">
                @Some Person
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
