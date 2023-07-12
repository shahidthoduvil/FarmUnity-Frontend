import React from 'react';

const UserList = () => {
    return (

        <div className="container mx-auto px-4 py-8">
            <div className="mb-4 w-full  mx-auto">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
            </div>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full overflow-hidden">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Username</th>
                                <th className="px-4 py-2 border-b">Email</th>
                                <th className="px-4 py-2 border-b">Category</th>
                                <th className="px-4 py-2 border-b">View</th>
                                <th className="px-4 py-2 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2">Ameen</td>
                                <td className="px-4 py-2">ameen@gmail.com</td>
                                <td className="px-4 py-2">Farmer</td>
                                <td className="px-4 py-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                                        View
                                    </button>
                                </td>
                                <td className="px-4 py-2">
                                    <select className="px-2 py-1 border border-gray-300 rounded-md">
                                        <option value="block">Block</option>
                                        <option value="unblock">Unblock</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>





    );
};

export default UserList