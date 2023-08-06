import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
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
import { FaSearch, FaChevronUp, FaChevronDown, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { BASE_URL } from '../../../utils/config';
import { AddMember } from './AddMember';
import MemberEdit from './MemberEdit';

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; //

  useEffect(() => {
    // Fetch the list of members from the backend API
    getAdminMember();
  }, []);

  async function getAdminMember() {
    try {
      console.log(BASE_URL + '/home/Admin-member/');
      const response = await axios.get(BASE_URL + '/home/Admin-member/');
      console.log('mgkljklgjlsjgklsg: ', response.data);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching Member:", error);
    }
  }

  const handleListUnlist = (memberId, isList) => {
    axios.patch(`${BASE_URL}/home/member/${memberId}/list_unlist/`, { is_list: isList })
      .then((response) => {
        console.log('Quote listed/unlisted successfully:', response.data);
        setMembers(prevMembers => prevMembers.map(member => member.id === memberId ? { ...member, is_list: isList } : member));
      })
      .catch((error) => {
        console.error('Error listing/unlisting quote:', error);
      });
  };

  const handleDeleteMember = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URL}/home/member/delete/${id}/`)
          .then(() => {
            getAdminMember();
          })
          .catch((error) => {
            console.log('Error deleting member:', error);
          });
      }
    });
  }

  return (
    <Card className="h-full w-full">
            {/* <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Members
            </Typography>
          </div>
        </div>
      </CardHeader>  */}

      <CardBody className="overflow-hidden px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                image
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                title
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                list
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                Action
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {members.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((member, index) => (
                <tr className="hover:bg-gray-50" key={member.id}>
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h- 10 w-10">
                      {member.img ? (
                        <img
                          className="h-full w-full object-cover object-center"
                          src={BASE_URL + member.img}
                          alt="avatar"
                        />
                      ) : (
                        "no image found"
                      )}
                      {member.is_list ? (
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 "></span>
                      ) : (
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-red-700 "></span>
                      )}
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <p> {member.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    {member.is_list ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        List
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        UnList
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      {member.is_list ? (
                        <button onClick={() => handleListUnlist(member.id, false)}>Unlist</button>
                      ) : (
                        <button onClick={() => handleListUnlist(member.id, true)}>List</button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <MemberEdit id={member.id} action={getAdminMember} />
                    </div>
                  </td>
                </tr>
              ))}
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 text-center text-red-500 font-bold"
              >
                {/* No related users found. */}
              </td>
            </tr>
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {Math.ceil(members.length / itemsPerPage)}
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
            disabled={currentPage === Math.ceil(members.length / itemsPerPage)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>

        
        </div>
        <AddMember action={getAdminMember} />
      </CardFooter>

    </Card>

  );
}

export default MembersList;
