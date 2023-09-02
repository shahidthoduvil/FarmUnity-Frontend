import React, { useState } from 'react';
import Rate2 from './Review/Rate2'
import Details2 from './Details/Details2';
import MapLocation from './Map/MapLocation';
import UserPostName from './UserPost/UserPostName';



const Slide2 = ({usernam}) => {
  const [activeTab, setActiveTab] = useState('');
  

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-2/3">
      <div className="relative right-0">
        <ul
          className="relative flex list-none flex-wrap rounded-xl bg-blue-gray-50/60 p-1"
          data-tabs="tabs"
          role="list"
        >
          <li className="z-30 flex-auto text-center">
            <button
              className={`text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out ${
                activeTab === 'Location' ? 'bg-white' : ''
              }`}
              onClick={() => handleTabChange('Location')}
            >
              <span className="ml-1">Location</span>
            </button>
          </li>
          <li className="z-30 flex-auto text-center">
            <button
              className={`text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out ${
                activeTab ==='post' ? 'bg-white' : ''
              }`}
              onClick={() => handleTabChange('post')}
            >
              <span className="ml-1">Posts</span>
            </button>
          </li>
          <li className="z-30 flex-auto text-center">
            <button
              className={`text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out ${
                activeTab === 'message2' ? 'bg-white' : ''
              }`}
              onClick={() => handleTabChange('message2')}
            >
              <span className="ml-1">Messages</span>
            </button>
          </li>
          <li className="z-30 flex-auto text-center">
            <button
              className={`text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out ${
                activeTab === 'Details2' ? 'bg-white' : ''
              }`}
              onClick={() => handleTabChange('Details2')}
            >
              <span className="ml-1">Details</span>
            </button>
          </li>
        </ul>
        <div data-tab-content="" className="p-5">
        <div
            className={`${
              activeTab === 'Location' ? 'block opacity-100' : 'hidden opacity-0'
            }`}
            id="Location"
            role="tabpanel"
          >
            <MapLocation/>
       
          </div>
          <div
            className={`${
              activeTab === 'post' ? 'block opacity-100' : 'hidden opacity-0 z-0'
            }`}
            id="post"
            role="tabpanel"
          >
            <UserPostName usernam={usernam}/>
       
          </div>
          <div
            className={`${
              activeTab === 'message2' ? 'block opacity-100' : 'hidden opacity-0'
            }`}
            id="message2"
            role="tabpanel"
          >
            <Rate2  usernam={usernam}/>
          </div>
          <div
            className={`${
              activeTab === 'Details2' ? 'block opacity-100' : 'hidden opacity-0'
            }`}
            id="Details2"
            role="tabpanel"
          >

           <Details2  usernam={usernam}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
