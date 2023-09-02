import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
import SigupPage from './pages/SigupPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

import PrivateRouter from './utils/PrivateRouter';


import AdminPanelPage from './component/AdminPages/AdminPanelPage';
import UserListPage from './component/AdminPages/UserListPage';
import BannerLIstPage from './component/AdminPages/BannerLIstPage';
import ForgotPassword from './component/Account/ForgotPassword';
import ResetPassword from './component/Account/ResetPassword';

import PageNotFound from './pages/PageNotFound';

import QuotesPage from './component/AdminPages/QuotesPage';
import NoficationPage from './component/AdminPages/NoficationPage';
import Memberlistpage from './component/AdminPages/Memberlistpage';
import Admin_login from './component/Account/Admin_login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Farmers from './component/FARMER/Farmers';
import AdminPostPage from './component/AdminPages/AdminPostPage';
import AdminProfile from './component/Admin/AdminProfile/AdminProfileDetails';
import UserRoutes from './utils/Routes/UserRoutes';
import FarmersPage from './pages/FarmersPage';

import News from './component/News/News';
import ProfileSetup from './component/Profile/ProfileSetup';
import UserProfile from './component/Profile/UserProfile';
import Solution from './component/Solutions/Solution';
import ProfilePage from './component/Profile/Profile';
import Chat from './component/FARMER/Chat';
import PostPage from './pages/PostPage';




function App() {

  const theme = createTheme();
  return (
    
    <Fragment>
      <Router>
        <Routes>

        <Route exact path='*' Component={PageNotFound}></Route>
        <Route exact path='/' element={<HomePage/>}></Route>



        <Route Component={Admin_login}path='adm/login'></Route>
        <Route  element={<PrivateRouter role='admin'  route={'/adm/login'}   />}>
          <Route Component={AdminPanelPage} path='adm'></Route>
          <Route Component={AdminProfile} path='adm/profile'></Route>
          <Route Component={UserListPage} path='adm/user-list'></Route>
          <Route Component={BannerLIstPage} path='adm/banner-list'></Route>
          <Route Component={QuotesPage} path='adm/quotes'></Route>
          <Route Component={NoficationPage} path='adm/Notification'></Route>
          <Route Component={Memberlistpage} path='adm/memberlist'></Route>
          <Route Component={AdminPostPage} path='adm/post'></Route>
        </Route>

     
          <Route Component={LoginPage} path='login'></Route>
          <Route Component={SigupPage} path='signup'></Route>
          <Route Component={ForgotPassword} path='forgot-password'></Route>
          <Route Component={ResetPassword} path='reset-password'></Route> 
        
  

        <Route element={<PrivateRouter   role='user' route={'login'} />}>

        <Route Component={PostPage} path='post'></Route>
          <Route Component={FarmersPage} path='/:userCategory/'></Route>
          <Route Component={Chat} path="/chat/:usernam" ></Route>
          <Route Component={News} path='news'></Route>
          <Route Component={ProfileSetup} path='profile-setup'></Route>
          <Route Component={UserProfile} path='user-profile/:usernam'></Route>
          <Route Component={Solution} path='solution'/>
          <Route Component={ProfilePage} path='profile'></Route>
    
         

         </Route>
         
        </Routes>
  

      </Router>
   

    </Fragment>
  );
}

export default App;
