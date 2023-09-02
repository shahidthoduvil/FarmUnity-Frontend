// Post.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { getLocal } from '../../../helpers/auth';
import Swal from 'sweetalert2'
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
import jwtDecode from 'jwt-decode';

const AdminPost = () => {
    const [posts, setPosts] = useState([]);
    const localResponse = getLocal('authToken');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; //
    const token = getLocal();
    const { user_id } = jwtDecode(token);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/post/post/${user_id}/`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };


    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/post/delete/${postId}/`, {
                headers: {
                    Authorization: `Bearer ${localResponse}`,
                },
            });

            if (response.status === 200) {

                await fetchPosts();
            }
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

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
                                id

                            </th>
                            <th scope="col" className="px-6 py-4 font-large text-gray-900">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-4 font-large text-gray-900">
                              category
                            </th>
                            <th scope="col" className="px-6 py-4 font-large text-gray-900">
                               occupation
                            </th>
                            <th scope="col" className="px-6 py-4 font-large text-gray-900">
                               UserProfile
                            </th>

                            <th scope="col" className="px-6 py-4 font-large text-gray-900">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-4 font-large text-gray-900">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-4 font-large text-gray-900">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-4 font-large text-gray-900">
                                Image
                            </th>
                         
                            <th scope="col" className="px-6 py-4 font-large text-gray-900">
                                Delete
                            </th>
              
                            
                        </tr>
                    </thead>
                    <tbody>
                        {posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((post, index) => (
                                <tr className="hover:bg-gray-50" key={post.id}>
                                    <td className="px-6 py-4">
                                        <p> {post.id}</p>
                                    </td>   <td className="px-6 py-4">
                                        <p> {post.user.username}</p>
                                    </td>
                                    <td className="hover:bg-gray-50">
                                    {post.user.cat.Category_name}
                                    </td>
                                    <td className="hover:bg-gray-50">
                                    {post.user.Occup.titile}
                                    </td>

                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <div className="relative h- 10 w-10">
                                            {post.user.pic ? (
                                                <img
                                                    className=" object-cover object-center w-20 h-16  rounded-full"
                                                    src={BASE_URL+post.user.pic}
                                                    alt="avatar"
                                                />
                                            ) : (
                                                "no image found"
                                            )}

                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <p> {post.Location}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p> {post.title}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p> {post.description}</p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <img
                                            className="w-24 h-16 object-cover rounded"
                                            src={BASE_URL+post.image}
                                            alt="Post"
                                        />
                                    </td>
                                
                                    <td className='px-6 py-4'>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            onClick={() => handleDeletePost(post.id)}
                                        >
                                            Delete
                                        </button>
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
                    Page {currentPage} of {Math.ceil(posts.length / itemsPerPage)}
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
                        disabled={currentPage === Math.ceil(posts.length / itemsPerPage)}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </Button>


                </div>

            </CardFooter>

        </Card>

    );
};

export default AdminPost;
