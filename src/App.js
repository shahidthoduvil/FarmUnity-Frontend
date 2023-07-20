import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
import SigupPage from './pages/SigupPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PrivateRouter from './utils/PrivateRouter';


import AdminPanelPage from './component/AdminPages/AdminPanelPage';
import UserListPage from './component/AdminPages/UserListPage';
import BannerLIstPage from './component/AdminPages/BannerLIstPage';
import ForgotPassword from './component/Account/ForgotPassword';
import ResetPassword from './component/Account/ResetPassword';

import PageNotFound from './pages/PageNotFound';
import ProfileSetupPage from './pages/ProfileSetupPage';

import QuotesPage from './component/AdminPages/QuotesPage';
import NoficationPage from './component/AdminPages/NoficationPage';
import Memberlistpage from './component/AdminPages/Memberlistpage';
import PostPage from './pages/PostPage';




function App() {
  return (
    
    <Fragment>
      <Router>
        <Routes>

        <Route exact path='*' Component={PageNotFound}></Route>
        <Route  path='/' exact  element={<PrivateRouter/>}></Route>

        
         
          <Route exact path='/' element={<HomePage/>}></Route>
          <Route Component={AdminPanelPage} path='adm'></Route>
          <Route Component={UserListPage} path='adm/user-list'></Route>
          <Route Component={BannerLIstPage} path='adm/banner-list'></Route>
          <Route Component={QuotesPage} path='adm/quotes'></Route>
          <Route Component={NoficationPage} path='adm/Notification'></Route>
          <Route Component={Memberlistpage} path='adm/memberlist'></Route>

          <Route Component={LoginPage} path='login'></Route>
          <Route Component={SigupPage} path='signup'></Route>
          <Route Component={ForgotPassword} path='forgot-password'></Route>
          <Route Component={ResetPassword} path='reset-password'></Route> 
          <Route Component={ProfilePage} path='profile'></Route>
          <Route Component={PostPage} path='post'></Route>
 
          <Route Component={ProfileSetupPage} path='profile-setup'></Route>
       
   
    
        
          


        </Routes>
      </Router>
   

    </Fragment>
  );
}

export default App;
