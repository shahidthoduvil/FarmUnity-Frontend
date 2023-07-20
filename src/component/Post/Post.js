import React from 'react'

const Post = () => {
  return (
    
    <div className="bg-indigo-100 min-h-screen flex flex-col md:flex-row md:flex-wrap justify-center">
    <div className="md:w-1/4 lg:w-1/5 p-5 md:px-12 lg:w-1/4 lg:pl-16 h-full overflow-y-auto bg-white">
      <div className="p-2">
        <img
          className="w-16 h-16 rounded-full mx-auto"
          src="http://lilithaengineering.co.za/wp-content/uploads/2017/08/person-placeholder.jpg"
          alt="Profile"
        />
        <h3 className="text-center mt-2 font-semibold text-gray-600">Some Person</h3>
      </div>
      <div className="border-t border-gray-300 my-3"></div>
      <div className="space-y-3">
        <a href="/" className="block text-xl text-gray-600 hover:bg-gray-200 p-3 rounded-lg">
          <i className="fa fa-home text-xl pr-1"></i>Home
        </a>
        <a href="/" className="block text-xl text-gray-600 hover:bg-gray-200 p-3 rounded-lg">
          <i className="fa fa-user-circle text-xl pr-1"></i>Profile
        </a>
        <a href="/" className="block text-xl text-gray-600 hover:bg-gray-200 p-3 rounded-lg">
          <i className="fa fa-sign-out text-xl pr-1"></i>Logout
        </a>
      </div>
    </div>

    <div className="md:w-3/4 lg:w-3/4 p-5 md:px-12 h-full overflow-y-auto">
      <div className="bg-white rounded-lg p-5">
        <textarea
          className="bg-gray-200 w-full rounded-lg shadow border p-2 resize-none"
          rows="5"
          placeholder="Share your thoughts..."
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

      <div className="mt-3 space-y-3">
        <div className="bg-white rounded-lg shadow">
          <img
            className="w-full rounded-t-lg"
            src="https://images.unsplash.com/photo-1572817519612-d8fadd929b00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            alt="Post"
          />
          <div className="p-5 text-xl text-gray-700 font-semibold">
            A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
          </div>
          <div className="p-1 flex justify-between">
            <button className="w-1/3 text-center text-xl text-gray-700 font-semibold hover:bg-gray-200">
              Like
            </button>
            <button className="w-1/3 border-l border-r text-center text-xl text-gray-700 font-semibold hover:bg-gray-200">
              Share
            </button>
            <button className="w-1/3 text-center text-xl text-gray-700 font-semibold hover:bg-gray-200">
              Comment
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