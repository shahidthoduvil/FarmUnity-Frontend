import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';


export default function Day10() {

  const [notifications, setNotifications] = useState([]);
  const token = getLocal();
  const { user_id } = jwtDecode(token);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);


  const fetchNotifications = async () => {
    try {
      setIsLoading(true); 
      const response = await axios.get(`${BASE_URL}/message/user-notifications/`);
      setNotifications(response.data);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setIsLoading(false);
    }
  };


  return (
    <Menu >
      <MenuHandler className="bg-[#788F69] rounded-2xl h-8 w-7 m-2  hover:bg-blue-gray-800">
      <IconButton variant=" " onClick={fetchNotifications} disabled={isLoading}>
          {isLoading ? (
            <span className="animate-spin">
              <BellIcon className="h-5 w-6" />
            </span>
          ) : (
            <BellIcon className="h-5 w-6" />
          )}
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
            <Avatar
              className="bg-[#788F69]"


              alt="tania andrew"
              src={notification.user.pic}
            />
            <div className="flex flex-col gap-1">
              <Typography variant="small" color="gray" className="font-normal">
                <span className="font-medium text-blue-gray-900">{notification.user.username}</span>
                <div className="message-container whitespace-nowrap overflow-hidden overflow-ellipsis">
                  <p>{notification.message}</p>
                </div>

              </Typography>
              <Typography
                variant="small"

                className="flex items-center gap-1 text-xs text-gray-600"
              >
                <ClockIcon className="h-3 w-3" />
                {/* <span>Posted on {new Date(notification.date).toLocaleDateString()}</span> */}
                <span>Posted on {new Date(notification.date).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</span>

              </Typography>
            </div>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}