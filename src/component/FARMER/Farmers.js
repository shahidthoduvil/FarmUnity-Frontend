import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar,Button } from '@mui/material';
import { BASE_URL } from '../../utils/config';
import { TextField, List, ListItem,Typography} from '@mui/material';

import axios from 'axios';
import { getLocal } from '../../helpers/auth';
import Chat from './Chat';

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const Farmers = () => {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { userCategory } = useParams();
  const [loggedInUserId, setLoggedInUserId] = useState(null); 
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);
  const [occupationSuggestions, setOccupationSuggestions] = useState([]);
  const [showUsernameSuggestions, setShowUsernameSuggestions] = useState(false);
  const [showOccupationSuggestions, setShowOccupationSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  
  const navigate=useNavigate()

  useEffect(() => {
    axios.get(`${BASE_URL}/home/users/category/${userCategory}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    .then((response) => {
      setUserList(response.data);
    })
    .catch((error) => console.error('Error fetching users:', error));
  }, [userCategory]);

  const fetchUsernameSuggestions = (inputValue) => {
    axios.get(`${BASE_URL}/home/users/auto-suggest/${userCategory}/?q=${encodeURIComponent(inputValue)}`)
      .then((response) => {
        setUsernameSuggestions(response.data);
      })
      .catch((error) => console.error('Error fetching username suggestions:', error));
  };





  const fetchOccupationSuggestions = (inputValue) => {
    axios.get(`${BASE_URL}/home/users/auto-suggest/${userCategory}/?q=${encodeURIComponent(inputValue)}`)
      .then((response) => {
        setOccupationSuggestions(response.data);
      })
      .catch((error) => console.error('Error fetching occupation suggestions:', error));
  };






  const debouncedFetchUsernameSuggestions = debounce(fetchUsernameSuggestions, 300);
  const debouncedFetchOccupationSuggestions = debounce(fetchOccupationSuggestions, 300);

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);

    debouncedFetchUsernameSuggestions(inputValue);
    debouncedFetchOccupationSuggestions(inputValue);

    axios.get(`${BASE_URL}/home/users/search/${userCategory}/?q=${encodeURIComponent(inputValue)}`)
      .then((response) => {
        setUserList(response.data.filter(user => user.id !== loggedInUserId));
      })
      .catch((error) => console.error('Error fetching search results:', error));

    setShowUsernameSuggestions(inputValue !== '');
    setShowOccupationSuggestions(inputValue !== '');
  };




  const handleUsernameSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.username);
    setUsernameSuggestions([]);
    setShowUsernameSuggestions(false);
    setShowOccupationSuggestions(false);
  };




  const handleOccupationSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.Occup__titile);
    setOccupationSuggestions([]);
    setShowUsernameSuggestions(false);
    setShowOccupationSuggestions(false);
  };




  return (
    <div className="bg-[#97b683] min-h-screen flex flex-col items-center py-8">
      <div className="max-w-2xl w-full p-4 bg-white shadow-md">
        <div className="flex items-center justify-between mb-4">
          <TextField
            type="text"
            className="w-full px-4 py-2 rounded-lg border focus:outline-none"
            placeholder="Search for users."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={() => {
              setShowUsernameSuggestions(true);
              setShowOccupationSuggestions(true);
            }}
          />
        </div>
        {showUsernameSuggestions && usernameSuggestions.length > 0 && (
        <List className="suggestions-list">
        {usernameSuggestions.map((suggestion, index) => (
          <ListItem key={index} button onClick={() => handleUsernameSuggestionClick(suggestion)}>
    <Typography variant="body1">{suggestion.username}</Typography>

          </ListItem>
        ))}
      </List>
        )}
        {showOccupationSuggestions && occupationSuggestions.length > 0 && (
          <List className="suggestions-list">
          {occupationSuggestions.map((suggestion, index) => (
            <ListItem key={index} button onClick={() => handleOccupationSuggestionClick(suggestion)}>
             <Typography variant="body1">{suggestion.Occup__titile}</Typography>
            </ListItem>
          ))}
        </List>
        )}
        {userList.length > 0 ? (
          userList.map((user) => (
            <div key={user.id} className="flex items-center p-2 border-b">
        
              <Avatar onClick={()=>navigate(`/home/user-profile/${user.username}`)} src={BASE_URL+user.pic} alt={user.username} sx={{ width: 60, height: 60, marginRight: 4 }} />
           
            <Link to={`/home/chat/${user.id}`} className="flex items-center p-2 border-b">
              <div className="flex flex-col">
                <div className="font-semibold text-gray-800">{user.first_name} {user.last_name}</div>
                <div className="text-gray-600">Category: {user.cat?.Category_name} </div>
                <div className="text-gray-600">Occupation: {user.Occup?.titile}</div>
                <div className="text-gray-600">Phone: {user.phone_number}</div>
              </div>
            </Link>
          </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>

    
    </div>
  );
};

export default Farmers;
