import React from 'react'
import Farmers from '../component/FARMER/Farmers'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getLocal } from '../helpers/auth';
import { useAccordion } from '@material-tailwind/react';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const FarmersPage = () => {
  const theme = createTheme();

  const navigate=useNavigate()
 
  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (decoded.is_admin==true) {
        navigate('/adm')
      }
    }
  }, []);
 


  return (
    <div>
  <ThemeProvider theme={theme}>
   <Farmers/>
   </ThemeProvider>
  


    </div>
  )
}

export default FarmersPage