import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box } from '@mui/material';
import { PacmanLoader, PulseLoader } from 'react-spinners';


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "rgb(10, 77, 201)",
};
const ProtectedRoute = () => {
  const { user, loading, isAuthenticated } = useAuth();
   console.log("user in protected route", user);
   
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <PacmanLoader
          color="rgb(10, 77, 201)"
          loading={loading}
          cssOverride={override}
          size={20}
          speedMultiplier={1.2}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.userType !== 2) {
    return <Navigate to="/401" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;