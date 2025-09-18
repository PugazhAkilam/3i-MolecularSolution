import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FaCalendarPlus } from "react-icons/fa";
//import patientsData from '../utils/newPatient';
import { useNavigate } from 'react-router-dom';
import { getRegisteredPatients } from '../service/patientService'; // adjust path as needed
import { formatDate } from '../utils/formatDate';

export default function RegisteredPatients() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [patientsData, setPatients] = useState([]);


    // Fetch data from API when component mounts
    
      useEffect(() => {
        const fetchRegisteredPatients = async () => {
          try {
            const data = await getRegisteredPatients();
            setPatients(data.data);
          } catch (err) {
            console.log('error', err);
          }
        };
        fetchRegisteredPatients();
      }, []);
    

  // Only show filtered patients if search box is NOT empty
const filteredPatients = search
  ? patientsData.filter((patient) => {
      const searchLower = search.toLowerCase();
      return (
        patient.mobile?.includes(searchLower) ||
        patient.firstName?.toLowerCase().includes(searchLower) || // safe
        patient.lastName?.toLowerCase().includes(searchLower) 
      );
    })
  : patientsData; // instead of [], otherwise you lose all data when search is empty


  return (
    <Box p={3} sx={{ bgcolor: "#fff", minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Search Patient
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          size="small"
          placeholder="Search by name or mobile number"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Search result
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Last Visit</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search ? (
              filteredPatients.length > 0 ? (
                filteredPatients.map((row, i) => (
                <TableRow key={i}>
                                               <TableCell>
                                                 <Link  color="primary" fontWeight={600} onClick={() => navigate(`/admin/VisitPatientId`)}>
                                                   {row.reg_patientId}
                                                 </Link>
                                               </TableCell>
                                               <TableCell>{row.firstName} {row.lastName}</TableCell>
                                               <TableCell>{row.mobile}</TableCell>
                                               <TableCell>{row.age}</TableCell>
                                           
                                               <TableCell>{formatDate(row.date)}</TableCell>
                    <TableCell>
                      <IconButton
  color="primary"
  onClick={() => navigate('/admin/appointment-step1', {
    state: {
      regId: row.reg_patientId,
      name: row.firstName+" "+row.lastName,
      mobile: row.mobile,
      age: row.age,
    }
  })}
>
  <FaCalendarPlus size={20} />
</IconButton>

                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No matching patients found
                  </TableCell>
                </TableRow>
              )
            ) : null}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="space-between" p={2}>
          <Typography variant="body2">
            {search
              ? `Showing ${filteredPatients.length} of ${patientsData.length} patients`
              : ''}
          </Typography>
          <Box>
            <Button variant="outlined" size="small" sx={{ mr: 1 }}>
              Prev
            </Button>
            <Button variant="outlined" size="small">
              Next
            </Button>
          </Box>
        </Box>
      </TableContainer>
    </Box>
  );
}
