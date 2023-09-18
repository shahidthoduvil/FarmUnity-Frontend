import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setNewNotification] = useState("");
  const token = getLocal();
  const { user_id } = jwtDecode(token);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/message/admin-notifications/${user_id}/`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationSend = async (e) => {
    e.preventDefault(); 
  
    if (!message.trim()) {
      console.log('Cannot send an empty notification.');
      return;
    }
  
    try {
      await axios.post(`${BASE_URL}/message/send-notifications/`, {
        message: message,
        user: user_id,
      });
      
      setNewNotification("");
      fetchNotifications();
      toast.success('Notification send successfully')

    } catch (error) {
      console.log('Error sending notification', error);
      toast.error.log('Error sending notification');
    }
  };

  const handleNotificationDelete=async(notificationId)=>{

    try{
      await axios.delete(`${BASE_URL}/message/delete-notification/${notificationId}/`);
      fetchNotifications();
      toast.success('Notification deleted successfully')

    }catch  (error) {
      console.log('Error deleting notification',error);
      toast.error('Error deleting notification');

    }
    
  }

  return (
    <div className="border rounded-md p-4 shadow-md">
      <div className="flex items-center mb-4 ">
        <div className="flex-shrink-0">
        <button
            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"
            onClick={fetchNotifications} 
          >
            <FontAwesomeIcon icon={faBell} className="text-xl" />
          </button>
        </div>
        <h2 className="ml-2 text-xl font-semibold">Notifications</h2>
      </div>
      <div className="notifications">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`notification ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} p-4 rounded-md shadow-md my-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src={notification.user.pic}
                  alt={`${notification.user.username}'s Profile`}
                  className="profile-pic w-12 h-12 rounded-full mr-2" 
                />
                <h3 className="notification-username text-lg font-semibold">
                  {notification.user.username}
                </h3>
              </div>
              <button
                onClick={() => handleNotificationDelete(notification.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="text-lg" />
              </button>
            </div>
            <p className="notification-message">{notification.message}</p>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-300 bg-white">
        <form onSubmit={handleNotificationSend}>
          <div className="flex">
            <textarea
              className="w-full border p-2 mr-2 rounded-md"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setNewNotification(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminNotification;


