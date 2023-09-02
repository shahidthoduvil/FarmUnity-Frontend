import React from 'react'
import AdminNotification from '../Admin/Notification/AdminNotification'
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoficationPage = () => {
  const navigate=useNavigate()

  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (!decoded.is_admin==true) {
        navigate('/')
      }
    }
  }, []);

  return (
    <div>

      <AdminNotification/>
    </div>
  )
}

export default NoficationPage