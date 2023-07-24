import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
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
import { FaSearch, FaChevronUp, FaChevronDown, FaEdit,FaTrash,FaPlusCircle } from "react-icons/fa"; // Import the icons from react-icons
import { BASE_URL } from '../../../utils/config';
import {AddMember} from './AddMember';




const  MembersList = () => {
  const [members, setMembers] = useState([]);




  useEffect(() => {
    // Fetch the list of banners from the backend API
      getAdminMember()
  }, []);

  async function  getAdminMember() {
    try {
      console.log(BASE_URL+'/home/member-list/');
      const response = await axios.get(BASE_URL+'/home/member-list/');
      console.log('mgkljklgjlsjgklsg: ',response.data);
      setMembers(response.data);
    
    } catch (error) {
      console.error("Error fetching   Member:", error);
    }
  }



//   const handleDeleteBanner=async(bannerId)=>{
//     try{
//       await axios.delete(`${BASE_URL}/home/banner/delete/${bannerId}/`)
//       getAdminBanner()

//     }
//     catch(error){
// console.log('error deleting banner ',error)
//     }
//   }



  const handleDeleteMember= (id) => {
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
            const banner = axios.delete(`${BASE_URL}/home/member/delete/${id}/`).then(
                async function   getAdminBanner() {
                    const request = await axios.get(BASE_URL+'/home/member-list/')

                    setMembers(request.data)
                }
            )

        }
    })
}



  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
            Members
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
        
        </div>
        <div className="flex items-center justify-between gap-4">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              
            </TabsHeader>
          </Tabs>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <tr>
                
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                  image
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                   titile
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                  list
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                   Delete
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Edit
                  </th>
                </tr>
          </thead>
          <tbody>
          {members.map((member) => (
        
                    <tr className="hover:bg-gray-50" key={member.id}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="relative h- 10 w-10">
                          {member.img ? (
                            <img
                              className="h-full w-full  object-cover object-center"
                              src={BASE_URL+ member.img}
                              alt="avatar"
                            />
                          ) : ( "no image found"
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
                          <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                            
                              readOnly
                            />
                            <div
                            
                              className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                            ></div>
                          
                              <span className="ml-2 text-sm font-medium text-gray-900">List</span>
                        
                              <span className="ml-2 text-sm font-medium text-gray-900">UnList</span>
                       
                          </label>
                        </div>
                     
                      
                      </td>
                      <td className="px-6 py-4">
                  <div className="flex gap-2">
              
                    {/* Delete button */}
                    <Button
                      color="red"
                      size="sm"
                      ripple="light"
                      onClick={() => {
                        handleDeleteMember(member.id)
                       }}
                    >
                      <FaTrash className="mr-1" /> 
                    </Button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {/* Edit button */}
                    <Button
                      color="lightBlue"
                      size="sm"
                      ripple="light"
                      onClick={() => {
                   
                      }}
                    >
                      <FaEdit className="mr-1" /> 
                    </Button>
                
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
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
        <AddMember/>
      </CardFooter>
      
    </Card>
  );
}

export default MembersList;
