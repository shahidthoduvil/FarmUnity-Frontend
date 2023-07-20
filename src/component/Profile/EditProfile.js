import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaEdit } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function Example() {

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  return (
    <Fragment>
      <Link to="">
        <div className="absolute right-0 bottom-0 bg-white rounded-full p-2 cursor-pointer"
        onClick={()=>handleOpen("md")}
         >
          <FaEdit size={20} variant="gradient" />

        </div>
      </Link>

      <Dialog open={size === "md"} size={size || "md"} handler={handleOpen} >
        <DialogHeader>EDIT YOUR PROFILE</DialogHeader>
        <DialogBody  >
       
                  <div className="p-8 bg-white shadow mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-1 flex flex-col">
                        <label
                          htmlFor="profilePicInput"
                          className="text-gray-500"
                        >
                          Profile Picture
                        </label>
                        <input
                          id="profilePicInput"
                          type="file"
                          className="mt-1 p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="md:col-span-1 flex flex-col">
                        <label
                          htmlFor="backgroundInput"
                          className="text-gray-500"
                        >
                          Background Cover Photo
                        </label>
                        <input
                          id="backgroundInput"
                          type="file"
                          className="mt-1 p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="md:col-span-1 flex flex-col">
                        <label
                          htmlFor="usernameInput"
                          className="text-gray-500"
                        >
                          Username
                        </label>
                        <input
                          id="usernameInput"
                          type="text"
                          className="mt-1 p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="md:col-span-1 flex flex-col">
                        <label
                          htmlFor="locationInput"
                          className="font-light text-gray-600"
                        >
                          Location
                        </label>
                        <input
                          id="locationInput"
                          type="text"
                          className="mt-1 p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>

                  </div>
            
        </DialogBody>

        <DialogFooter>
          <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => handleOpen(null)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}





