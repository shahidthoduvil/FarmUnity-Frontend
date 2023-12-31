



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profilePicture from '../../../images/images.jpg';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Chip,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { FaSearch, FaChevronUp, FaChevronDown, FaEdit } from "react-icons/fa";
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
// const {user_id}=getLocal('authToken')
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MembersList = () => {
  const [users, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const respone= getLocal('authToken')
  const decode=jwtDecode(respone)

  useEffect(() => {
    getUserList();
    console.log(decode,'decoded admin ,,,,,,,,,,,,,,,,,,,,,,,,')
  }, []);

  async function getUserList() {
    try {
      const response = await axios.get(BASE_URL + '/api/listUser/');
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
      toast.error("Error fetching user list:");
    }
  }

  async function changeStatus(id) {
    try {
      const response = await axios.patch(`${BASE_URL}/api/blockUser/${id}/`);
      getUserList();
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
      toast.error('Error blocking/unblocking user:');
    }
  }




  async function serachUser(keyword) {
    const request = await axios.get(`${BASE_URL}/api/adminsearchUser/?search=${keyword}`);
    if (request.data.length === 0) {
  
    }
    setUserList(request.data);
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
              onChange={e => serachUser(e.target.value)}
              label="Search"
              icon={<FaSearch className="h-5 w-5" />}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>

            </TabsHeader>
          </Tabs>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0"> {/* Change overflow-scroll to overflow-hidden */}
      <ToastContainer/>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                User Name
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                category
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                subcategory
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((user, index) => (
                <tr className="hover:bg-gray-50" key={index}>
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h- 10 w-10">
                      {user?.pic ? (
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={user?.pic}
                          alt="avatar"
                        />
                      ) : (
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={profilePicture}
                          alt="avatar"
                        />
                      )}
                      {user?.is_active ? (
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 "></span>
                      ) : (
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-red-700 "></span>
                      )}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">{user?.username}</div>
                      <div className="text-gray-400">{user?.email}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <p>{user.cat?.Category_name}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p>{user.Occup?.titile}</p>
                  </td>
                  <td className="px-6 py-4">
                    {user?.is_active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        Blocked
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={user?.is_active}
                          readOnly
                        />
                        <div
                          onClick={() => changeStatus(user.id)}
                          className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                        ></div>
                        {user?.is_active ? (
                          <span className="ml-2 text-sm font-medium text-gray-900">Block</span>
                        ) : (
                          <span className="ml-2 text-sm font-medium text-gray-900">Unblock</span>
                        )}
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-red-500 font-bold">
                {/* No related users found. */}
              </td>
            </tr>
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MembersList;