import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
import SigupPage from './pages/SigupPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';


import AdminPanelPage from './component/AdminPages/AdminPanelPage';
import UserListPage from './component/AdminPages/UserListPage';
import BannerLIstPage from './component/AdminPages/BannerLIstPage';



function App() {
  return (
    
    <Fragment>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage/>}></Route>
          <Route Component={AdminPanelPage} path='adm'></Route>
          <Route Component={UserListPage} path='adm/user-list'></Route>
          <Route Component={BannerLIstPage} path='adm/banner-list'></Route>

          <Route Component={LoginPage} path='login'></Route>
          <Route Component={SigupPage} path='signup'></Route>
          <Route Component={ProfilePage} path='profile'></Route>
        
          


        </Routes>
      </Router>
   

    </Fragment>
  );
}

export default App;
