import React from 'react'
import Farmers from '../component/FARMER/Farmers'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const FarmersPage = () => {
  const theme = createTheme();
  return (
    <div>
  <ThemeProvider theme={theme}>
   <Farmers/>
   </ThemeProvider>
  


    </div>
  )
}

export default FarmersPage