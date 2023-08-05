import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Card,
  CardHeader,
  Typography,
  Chip,
  CardBody,
  Tabs,
  TabsHeader,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { FaSearch, FaChevronUp, FaChevronDown, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { BASE_URL } from '../../../utils/config';
import { AddQuote } from './AddQuote';
import EditQuote from './EditQuote';

const Quotes = () => {
  const [quotes, setQuotes] = useState([{
    is_list: false,
  }]);

  useEffect(() => {
    // Fetch the list of quotes from the backend API
    getAdminQuotes()
  }, []);

  async function getAdminQuotes() {
    try {
      console.log(BASE_URL + '/home/Admin-quote/');
      const response = await axios.get(BASE_URL + '/home/Admin-quote/');
      console.log('mgkljklgjlsjgklsg: ', response.data);
      setQuotes(response.data);
    } catch (error) {
      console.error("Error fetching quote-list:", error);
    }
  }

  const handleListUnlist = (quoteId, isList) => {
    axios.patch(`${BASE_URL}/home/quote/${quoteId}/list_unlist/`, { is_list: isList })
      .then((response) => {
        console.log('Quote listed/unlisted successfully:', response.data);
        setQuotes(prevQuotes => prevQuotes.map(quote => quote.id === quoteId ? { ...quote, is_list: isList } : quote));
      })
      .catch((error) => {
        console.error('Error listing/unlisting quote:', error);
      });
  };

  const handleDeleteQuotes = (id) => {
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
        axios.delete(`${BASE_URL}/home/quote/delete/${id}/`)
          .then(() => {
            getAdminQuotes();
          })
          .catch((error) => {
            console.log('Error deleting quote:', error);
          });
      }
    });
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              QUOTES
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {/* ... Add tabs headers here if needed ... */}
            </TabsHeader>
          </Tabs>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                Content
              </th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">
                Author
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
            {quotes.map((quote) => (
              <tr className="hover:bg-gray-50" key={quote.id}>
                <td className="px-6 py-4">
                  <p> {quote.content}</p>
                </td>
                <td className="px-6 py-4">
                  <p> {quote.Author}</p>
                </td>
                <td className="px-6 py-4">
                  {quote.is_list ? (
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
                    {quote.is_list ? (
                      <button onClick={() => handleListUnlist(quote.id, false)}>Unlist</button>
                    ) : (
                      <button onClick={() => handleListUnlist(quote.id, true)}>List</button>
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
                        handleDeleteQuotes(quote.id)
                      }}
                    >
                      <FaTrash className="mr-1" />
                    </Button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <EditQuote id={quote.id} action={getAdminQuotes} />
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
        <AddQuote action={getAdminQuotes} />
      </CardFooter>
    </Card>
  );
}

export default Quotes;
