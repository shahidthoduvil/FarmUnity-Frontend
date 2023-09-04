import { Link, useNavigate } from "react-router-dom";
import profilePicture from '../../images/images.jpg';


import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  InboxArrowDownIcon,
  UserCircleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { getLocal } from "../../helpers/auth";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";


export default function Example() {

  const localResponse = getLocal('authToken');
  const [user, setUser] = useState({})


  const token = getLocal()
  const { user_id } = jwtDecode(token)
  const history = useNavigate()


  const handleclick = () => {
    localStorage.removeItem('authToken');
    history('/')
  }

  async function getUser() {
    try {
      const response = await axios.get(`${BASE_URL}/api/getuserdetails/${user_id}/`)
      setUser(response.data.user)



    } catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <Menu >
      <MenuHandler  >
        {user?.pic ? (
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointer w-9 h-9"
            src={BASE_URL+user.pic}
          />

        ) : (
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointer w-9 h-9"
            src={profilePicture}
          />

        )}


      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2">
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            <Link to='profile' >My profile</Link>
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Help
          </Typography>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 ">
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          {localResponse ? <Typography variant="small" className="font-normal" onClick={() => handleclick()}>
            Sign Out
          </Typography> : <Typography variant="small" className="font-normal">
            <Link to='/logi'>login</Link>
          </Typography>}

        </MenuItem>
      </MenuList>
    </Menu>
  );
}