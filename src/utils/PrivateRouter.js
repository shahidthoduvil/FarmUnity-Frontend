import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import { Navigate, Outlet, useNavigate, useOutlet } from 'react-router-dom';
import AdminPanelPage from '../component/AdminPages/AdminPanelPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NoficationPage from '../component/AdminPages/NoficationPage';
import jwtDecode from 'jwt-decode';
import { base_url } from './config';
import { getLocal } from '../helpers/auth';
import axios from 'axios';


// const PrivateRouter = ({ children, ...rest }) => {

//     const response = localStorage.getItem('authToken');
//     console.log('Response ::>> ',response);
//     const navigate = useNavigate("")

//     if (response) {
//         const decoded = jwt_decode(response)
//         console.log('Decoded ::>> ',decoded);
//         if (decoded.is_admin) {
//             console.log('admin');
//             return (
//                 <div>
//                     <AdminPanelPage />

//                 </div >
//             )
//         }
//         else if (!decoded.is_admin) {
//             return <HomePage />
//         }
//         else {
//             console.log('no token');
//             return <LoginPage/>
//         }
//     }else{
//         return <LoginPage/>
//     }

// }

// export default PrivateRouter






export default function PrivateRouter({ role, route }) {
    const [verify, setVerify] = useState(null);
    const localResponse = getLocal();
    
    if(localResponse){
      const decoded = jwtDecode(localResponse);
    }

  
    useEffect(() => {
      if (role === 'user') {
        axios.post(
          base_url + '/is-user/',
          null,
          {
            headers: {
              Authorization: `Bearer ${localResponse}`,
            },
          }
        )
          .then((res) => {
            setVerify(res.data);
          })
          .catch((err) => { console.log('HEERREE' + err); setVerify(false) });
      } else if (role === 'admin') {
        axios.post(
          base_url + '/is-admin/',
          null,
          {
            headers: {
              Authorization: `Bearer ${localResponse}`,
            },
          }
        )
          .then((res) => {
            setVerify(res.data);
          })
          .catch((err) => setVerify(false));
      }
    }, [role, localResponse]);
  
    // The return statement should be here, inside the function component
    if (verify === null) {
      // Render a loading state or return null while waiting for verification
      return null;
    }
  
    return verify ? <Outlet /> : <Navigate to={route} />;
  }
