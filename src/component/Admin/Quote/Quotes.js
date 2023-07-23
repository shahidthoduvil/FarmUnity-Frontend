import React from 'react'

const Quotes = () => {
  return (
    <>
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
            <Input onChange={e=>serachUser(e.target.value)}
            label="Search" icon={<FaSearch className="h-5 w-5" />} />
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
       
        
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="relative h- 10 w-10">
                          
                            <img
                              className="h-full w-full rounded-full object-cover object-center"
                          
                              alt="avatar"
                            />
                    
                            <img
                              className="h-full w-full rounded-full object-cover object-center"
                         
                              alt="avatar"></img>
          
                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 "></span>
            
                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-red-700 "></span>
                
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-700"></div>
                          <div className="text-gray-400"></div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <p></p>
                      </td>
                      <td className="px-6 py-4">
                        <p></p>
                      </td>
                      <td className="px-6 py-4">
                   
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                          List
                          </span>
            
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                           UnList
                          </span>
              
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
                    </tr>
             
               
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
      </CardFooter> 
    </Card>
    </>

  )
}

export default Quotes