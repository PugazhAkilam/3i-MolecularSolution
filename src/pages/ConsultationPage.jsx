import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, AppBar,Divider  } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PatientDetails from '../components/Consultantion/PatientDetails';
import ConsultationTab from '../components/Consultantion/ConsultationTab';
import MedicalHistoryTab from '../components/Consultantion/MedicalHistoryTab';
import PreviousVisitTab from '../components/Consultantion/PreviousVisitTab';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(11,58,132)',
    },
    secondary: {
      main: '#dc004e',
    },   
    
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ flexGrow: 1 }}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Consultant = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const patientData = {
    name: 'Rakshita',
    age: 35,
    sex: 'Female',
    weight: 65,
    height: 160,
    mobile: '9994403456',
    email: 'name@domain.xxx',
    address: '35/335, venkteshan nagar, 2 cross street, Chennai-600092',
  };

  const appointmentData = {
    doctor: 'Dr.Ram',
    date: '25-Sep-2025',
    time: '10:30 AM',
  };

  return (
    <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex'}}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
          <Box sx={{padding: '10px'}}>
  <Typography variant="h6" component="h1" sx={{padding: '8px 5px', fontWeight: 'bold'}}  gutterBottom>
    Consultation for Rakshita
  </Typography>
   <Divider sx={{marginBottom: '10px'}}/>
    <Tabs value={value} onChange={handleChange} sx={{ padding: '0 20px'}} aria-label="consultation tabs">
      <Tab label="Consultation" {...a11yProps(0)} />
      <Tab label="Medical History" {...a11yProps(1)} />
      <Tab label="Previous Visit" {...a11yProps(2)} />
    </Tabs>
</Box>

          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <TabPanel value={value} index={0}>
              <ConsultationTab />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MedicalHistoryTab />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PreviousVisitTab />
            </TabPanel>

            <PatientDetails patientData={patientData} appointmentData={appointmentData} />
          </Box>
        </Box>
        </Box>
      
    </ThemeProvider>
  );
};

export default Consultant;
