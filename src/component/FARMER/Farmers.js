import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { BASE_URL } from '../../utils/config';
import axios from 'axios';


const Farmers = () => {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { userCategory } = useParams();
 
  useEffect(() => {

    console.log('Category category is ==> ',userCategory);
    axios.get(`${BASE_URL}/home/users/category/${userCategory}`)
      .then((response) => {
     
        console.log(response.data);
       
        setUserList(response.data);
     
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, [userCategory]);


  useEffect(() => {
    fetchSearchResults();
  }, [userCategory, searchQuery]);

  const fetchSearchResults = () => {
    const queryParams = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : '';
    axios.get(`${BASE_URL}/home/users/search/${userCategory}/${queryParams}`)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => console.error('Error fetching search results:', error));
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };




  return (
    <div className="bg-[#97b683] min-h-screen flex flex-col items-center py-8">
      <div className="max-w-2xl w-full p-4 bg-white shadow-md">
        <div className="flex items-center justify-between mb-4">
        <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border focus:outline-none"
            placeholder="Search for users ."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />

        </div>
        {userList.map((user) => (
          <div key={user.id} className="flex items-center p-2 border-b">
            <Link to={`/profile/${user.id}`}>
              <Avatar src={`${BASE_URL}/${user.pic}`} alt={user.username} sx={{ width: 60, height: 60, marginRight: 4 }} />
            </Link>
            <Link to={`/chat/${user.id}`} className="flex items-center p-2 border-b">
              <div className="flex flex-col">
                <div className="font-semibold text-gray-800">{user.first_name} {user.last_name}</div>
                <div className="text-gray-600">Category:{user.cat?.Category_name} </div>
                <div className="text-gray-600">Occupation:{user.Occup?.titile}</div>
                <div className="text-gray-600">Phone: {user.phone_number}</div>
                {/* Add other user details you want to display */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Farmers;
