import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import AuthPage from '../pages/AuthPage';
import AdminLayout from '../pages/LayOut';
import WelcomeDashboard from '../pages/WelcomeDashboard';

import NotFound from '../pages/NotFoundPage';
import Unauthorized from '../pages/UnAuth';

import ProtectedRoute from './protect.routes';
import Appointment from '../components/Appointment';
import NewPatient from '../components/NewPatient';
import RegPatient from '../components/RegPatient';
import Report from '../components/Report';

import VisitHis from '../components/VisitHis';
import LoginPage from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import PatientsList from '../components/PatientList';
import AppointmentStep1 from '../components/Appointment/Step1';
import AppointmentStep2 from '../components/Appointment/Step2';
import AppointmentStep3 from '../components/Appointment/Step3';
import UpdateAppointmentStep1 from '../components/UpdateAppointment/Step1';
import UpdateAppointmentStep2 from '../components/UpdateAppointment/Step2';
import UpdateAppointmentStep3 from '../components/UpdateAppointment/Step3';
import SearchPatient from '../components/SearchPatient';
import VisitorHistoryId from '../components/VisitPatientId';
import ConsultationPage from '../pages/ConsultationPage';


const AppRoutes = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Use useEffect to check localStorage on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('userData');
    if (loggedIn) {
      setIsAuthenticated(true);
    }
  }, []);


  return (
    <Routes>
      {/* Public Routes */}
    <Route
          path="/"
          element={
            isAuthenticated ? (
              // If authenticated, navigate to the dashboard
              <Navigate to="/admin" replace />
            ) : (
              // If not, show the login page
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/401" element={<Unauthorized />} />
  
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* <Route element={<ProtectedRoute />}> */}
          <Route index element={<WelcomeDashboard />} />
          <Route path="appointment" element={<Appointment />} />
             <Route path="appointment-step1" element={<AppointmentStep1 />} />
                <Route path="appointment-step2" element={<AppointmentStep2 />} />
                   <Route path="appointment-step3" element={<AppointmentStep3 />} />
                    <Route path="update-appointment-step1" element={<UpdateAppointmentStep1 />} />
                <Route path="update-appointment-step2" element={<UpdateAppointmentStep2 />} />
                   <Route path="update-appointment-step3" element={<UpdateAppointmentStep3 />} />
          <Route path="newpatient" element={<NewPatient />} />
          <Route path="regpatient" element={<RegPatient />} />
          <Route path="visitorhistory" element={<VisitHis />} />
          <Route path="report" element={<Report />} />
             <Route path="2" element={<PatientsList />} />
          <Route path='searchpatient' element={<SearchPatient />}/>
        <Route path='VisitPatientId' element={<VisitorHistoryId/>}/>
        <Route path='consultation' element={<ConsultationPage/>}/>
      
      </Route>

    
      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
