import React from 'react'
import img from '../../images/farm.jpg'
const Post = () => {
  return (
    
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:flex-wrap justify-center">
    <div className="md:w-2/3 lg:w-2/5 p-5 md:px-12 md:py-8 h-full mx-auto">
      <div className="bg-white rounded-lg p-5 shadow-md">
        <textarea
          className="bg-gray-200 w-full rounded-lg shadow border p-3 resize-none text-xl placeholder-gray-700"
          rows="5"
          placeholder="What's on your mind?"
        ></textarea>

        <div className="flex items-center justify-between mt-3">
          <select className="w-1/3 p-2 rounded-lg bg-gray-200 shadow border">
            <option>Public</option>
            <option>Private</option>
          </select>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold">
            Post
          </button>
        </div>
      </div>

      <div className="mt-5">
        <div className="bg-white rounded-lg shadow-md">
          <img
            className="w-full h-64 object-cover rounded-t-lg"
            src={img}
            alt="Post"
          />
          <div className="p-5 text-xl text-gray-700 font-semibold">
            A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
          </div>
          <div className="p-2 flex justify-between border-t">
            <button className="w-1/3 text-center text-xl text-gray-700 font-semibold hover:bg-gray-200">
              <i className="far fa-thumbs-up"></i> Like
            </button>
            <button className="w-1/3 border-l border-r text-center text-xl text-gray-700 font-semibold hover:bg-gray-200">
              <i className="far fa-comment"></i> Comment
            </button>
            <button className="w-1/3 text-center text-xl text-gray-700 font-semibold hover:bg-gray-200">
              <i className="far fa-share-square"></i> Share
            </button>
          </div>
          <div className="p-5 text-xl text-gray-700 font-semibold">
            @Some Person
          </div>
        </div>

        {/* Repeat the above block for more posts */}
      </div>
    </div>
  </div>
  )
}

export default Post