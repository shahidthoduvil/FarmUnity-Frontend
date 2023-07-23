import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaPlusCircle } from "react-icons/fa";

export function Editbanner() {
  const [size, setSize] = React.useState(null);

  const handleOpen = (value) => setSize(value);

  return (
    <>
      <div className="mb-3 flex gap-3">
        <Button onClick={() => handleOpen("sm")} variant="gradient">
          <FaPlusCircle />
        </Button>
      </div>
      <Dialog open={size === "sm"} size={size || "sm"} handler={handleOpen}>
        <form>
          <DialogHeader>Its a simple dialog.</DialogHeader>
          <DialogBody divider>
            <div className="md:grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="text-gray-600">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 p-3 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="image" className="text-gray-600">
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="mt-1 p-3 border border-gray-300 rounded w-full"
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => handleOpen(null)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={() => handleOpen(null)}>
              <span>ADD</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
