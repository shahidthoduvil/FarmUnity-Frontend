import React from 'react'
import { getLocal } from '../helpers/auth';
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import AdminPanelPage from '../component/AdminPages/AdminPanelPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';


const Private_Router = ({ children, ...rest }) => {
    const response = getLocal('authToken');
    const history = useNavigate("")

    if (response) {
        const decoded = jwt_decode(response)

        if (decoded.is_admin) {
            console.log('admin');
            return (
                <div>
                    <AdminPanelPage />

                </div >
            )
        }
        else if (!decoded.is_admin) {
            return <HomePage />
        }
        else {
            console.log('no token');
            return <LoginPage/>
        }
    }else{
        return history('/')
    }
   
}

export default Private_Router