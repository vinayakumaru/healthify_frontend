import * as React from 'react';
import NavDrawer from '../components/NavDrawer';
import Search from '../components/Search';
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';

export default function Home() {
  return (
    // <NavDrawer></NavDrawer>
    <Navigate to="/bookAppointment" />
  );
}