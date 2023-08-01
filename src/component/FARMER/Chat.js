import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Link from 'react'

const Chat = () => {
  const { userId } = useParams();

  // Here you can fetch the necessary data for the chat based on the userId
  // For simplicity, I'll use some dummy data as an example
  const chatData = [
    {
      id: 1,
      senderId: 1,
      message: 'Hello!',
    },
    {
      id: 2,
      senderId: 2,
      message: 'Hi there!',
    },
    // Add more messages here
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
       
      <div className="bg-white py-4 px-8 shadow-md flex items-center">
        <Avatar sx={{ width: 40, height: 40, marginRight: 4 }} />
        <h2 className="text-xl font-semibold">{`Chat with User ${userId}`}</h2>
      </div>
     
      <div className="flex-grow p-4 overflow-auto">
        {chatData.map((message) => (
          <div key={message.id} className="mb-2">
            {message.senderId === parseInt(userId) ? (
              <div className="bg-blue-500 text-white py-2 px-4 rounded-lg inline-block">
                {message.message}
              </div>
            ) : (
              <div className="bg-gray-300 py-2 px-4 rounded-lg inline-block">
                {message.message}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-white p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none"
        />
        {/* Add send message functionality here */}
      </div>
    </div>
  );
};

export default Chat;
