import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { getLocal } from "../../helpers/auth";
import jwtDecode from "jwt-decode";
import { BASE_URL } from "../../utils/config";
import { toast, ToastContainer } from "react-toastify"; 
export default function Example({ refreshProfile, action, user }) {
  const [size, setSize] = useState(null);

  const token = getLocal();
  const { user_id } = jwtDecode(token);

  const handleOpen = (value) => setSize(value);

  const [formData, setFormData] = useState({
    username: "",
    pic: null,
    cover: null,
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    pic: "",
    cover: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`${BASE_URL}/api/getuserdetails/${user_id}`);
        const user = response.data;

        // Set form data with user data
        setFormData({
          username: user.username,
          pic: null,
          cover: null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [user_id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pic: file });
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cover: file });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Custom validation
    const errors = {};
    if (!formData.username || !formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (formData.pic && formData.pic.size > 1024 * 1024) {
      errors.pic = "Profile picture is too large (max 1MB)";
    }
    if (formData.cover && formData.cover.size > 1024 * 1024) {
      errors.cover = "Cover photo is too large (max 1MB)";
    }
  
    if (Object.keys(errors).length > 0) {
      // There are validation errors, update the state
      setValidationErrors(errors);
    } else {
      // Validation passed, proceed with form submission
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username);
        if (formData.pic) {
          formDataToSend.append("pic", formData.pic);
        }
        if (formData.cover) {
          formDataToSend.append("cover", formData.cover);
        }

        await axios.patch(`${BASE_URL}/api/update-profile/${user_id}/`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Profile updated successfully");


        // Close the modal and refresh the profile data after a successful update
        handleOpen(null);
        action();
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };
  

  return (
    <Fragment>
      <Link to="">
        <div
          className="absolute right-0 bottom-0 bg-white rounded-full p-2 cursor-pointer"
          onClick={() => handleOpen("md")}
        >
          <FaEdit size={20} variant="gradient" />
        </div>
      </Link>

      <Dialog open={size === "md"} size={size || "md"} handler={handleOpen}>
        <DialogHeader>EDIT YOUR PROFILE</DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <div className="p-8 bg-white shadow mt-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1 flex flex-col">
                  <label htmlFor="profilePicInput" className="text-gray-500">
                    Profile Picture
                  </label>
                  <input
                    id="profilePicInput"
                    type="file"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    onChange={handleImageChange}
                  />
                  {validationErrors.pic && (
                    <div className="text-red-500">{validationErrors.pic}</div>
                  )}
                </div>
                <div className="md:col-span-1 flex flex-col">
                  <label htmlFor="backgroundInput" className="text-gray-500">
                    Background Cover Photo
                  </label>
                  <input
                    id="backgroundInput"
                    type="file"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    onChange={handleCoverImageChange}
                  />
                  {validationErrors.cover && (
                    <div className="text-red-500">{validationErrors.cover}</div>
                  )}
                </div>
                <div className="md:col-span-1 flex flex-col">
                  <label htmlFor="usernameInput" className="text-gray-500">
                    Username
                  </label>
                  <input
                    id="usernameInput"
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                  />
                  {validationErrors.username && (
                    <div className="text-red-500">{validationErrors.username}</div>
                  )}
                </div>
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
            <Button type="submit" variant="gradient" color="green">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      <ToastContainer />
    </Fragment>
  );
}
