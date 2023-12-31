import React, { useState, useEffect } from 'react';
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
import { Addbanner } from './Addbanner';
import BannerEdit from './BannerEdit';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5

  useEffect(() => {
    getAdminBanner();
  }, []);

  async function getAdminBanner() {
    try {
      const response = await axios.get(BASE_URL + '/home/Admin-banner/');
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banner list:", error);
      toast.error("Error fetching banner list:", error);
    }
  }

  const handleListUnlist = (bannerId, isList) => {
    axios.patch(`${BASE_URL}/home/banner/${bannerId}/list_unlist/`, { is_list: isList })
      .then((response) => {
        console.log('Banner listed/unlisted successfully:', response.data);
  
        setBanners(prevBanners => prevBanners.map(banner => banner.id === bannerId ? { ...banner, is_list: isList } : banner));
        toast.success('Banner listed/unlisted successfully:');
   
      })
      .catch((error) => {
        console.error('Error listing/unlisting banner:', error);
        toast.error('Error listing/unlisting banner:', error);
      });
  };

  const handleDeleteBanner = (id) => {
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
        axios.delete(`${BASE_URL}/home/banner/delete/${id}/`)
          .then(() => {
            getAdminBanner();
            toast.success('Banner deleted successfully')
          })
          .catch((error) => {
            console.log('Error deleting banner:', error);
            toast.error('Error deleting banner:');
          });
      }
    });
  };

  return (
    <Card className="h-full w-full">
      <ToastContainer/>
      {/* <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Banner
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all banners
            </Typography>
          </div>
        </div>
      </CardHeader>  */}
      <CardBody className="overflow-hidden px-0">
      <div className="overflow-x-auto"> 
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                Image
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                Title
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                List
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
            {banners.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((banner) => (
              <tr className="hover:bg-gray-50" key={banner.id}>
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h- 10 w-10">
                    {banner.img ? (
                      <img
                        className="h-full w-full object-cover object-center"
                        src={banner.img}
                        alt="banner"
                      />
                    ) : (<img
                      className="h-full w-full object-cover object-center"
                      src={profilePicture}
                      alt="placeholder"
                    />
                    )}
                    {banner.is_list ? (
                      <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 "></span>
                    ) : (
                      <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-red-700 "></span>
                    )}
                  </div>
                </th>
                <td className="px-6 py-4">
                  <p> {banner.title}</p>
                </td>
                <td className="px-6 py-4">
                  {banner.is_list ? (
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
                    {banner.is_list ? (
                      <button onClick={() => handleListUnlist(banner.id, false)}>Unlist</button>
                    ) : (
                      <button onClick={() => handleListUnlist(banner.id, true)}>List</button>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      color="red"
                      size="sm"
                      ripple="light"
                      onClick={() => {
                        handleDeleteBanner(banner.id)
                      }}
                    >
                      <FaTrash className="mr-1" />
                    </Button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <BannerEdit id={banner.id} action={getAdminBanner} />
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-red-500 font-bold">
                {/* No related banners found. */}
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-2">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {Math.ceil(banners.length / itemsPerPage)}
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
            disabled={currentPage === Math.ceil(banners.length / itemsPerPage)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
        <Addbanner action={getAdminBanner} />
      </CardFooter>
    </Card>

  );
}

export default BannerList;
