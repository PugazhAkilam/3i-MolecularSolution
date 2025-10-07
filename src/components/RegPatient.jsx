import React, { useState } from 'react';
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
  MenuItem,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { RiCloseCircleFill } from "react-icons/ri";
import { FaCalendarPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getRegisteredPatients ,deletePatient } from '../service/patientService'; // adjust path as needed
import { formatDate } from '../utils/formatDate';
import { showDeleteConfirmation } from '../utils/sweetAlert';

// DatePicker and localization
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import PaginationControls from './Pagination/PaginatedControls';

export default function RegisteredPatients() {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState(null); // use Dayjs object
  const [doctorFilter, setDoctorFilter] = React.useState('');
  const navigate = useNavigate();
  const [ currentPage, setCurrentPage ] = useState(1);
  const rowsPerPage = 10;

  const totalCount = filteredData.length;
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalCount);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedRows = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => {
    const fetchRegisteredPatients = async () => {
      try {
        const data = await getRegisteredPatients();
        setData(data.data);
      } catch (err) {
        console.log('error', err);
      }
    };
    fetchRegisteredPatients();
  }, []);

  useEffect(() => {
    let filtered = [...data];
    setCurrentPage(1)
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.mobile?.includes(search) ||
          item.firstName?.toLowerCase().includes(lower) ||
          item.lastName?.toLowerCase().includes(lower)
      );
    }

    if (doctorFilter) {
      filtered = filtered.filter(item => item.doctor === doctorFilter);
    }

   if (dateFilter) {
  const filterDateStr = dayjs(dateFilter).format("YYYY-MM-DD");
  filtered = filtered.filter(item =>
    dayjs(item.date).utc().format("YYYY-MM-DD") === filterDateStr
  );
}


    setFilteredData(filtered);
  }, [search, doctorFilter, dateFilter, data]);

   const handleDelete = async (patientId) => {
        const result = await showDeleteConfirmation();

        if (result.isConfirmed) {
            try {
                await deletePatient(patientId);
                await fetchRegisteredPatients(); // Re-fetch the data to update the table
                Swal.fire(
                    'Deleted!',
                    'The patient has been soft-deleted.',
                    'success'
                );
            } catch (err) {
                console.error("Error deleting patient:", err);
                Swal.fire(
                    'Failed!',
                    'Could not delete the patient.',
                    'error'
                );
            }
        }
    };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={3} sx={{ bgcolor: "#fff", minHeight: '100vh' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Registered Patients
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Patients List
        </Typography>
      <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap={2}
            justifyContent="space-between"
            mb={1.5}
          >
          <TextField
            size="small"
            placeholder="Search by name or mobile number"
            variant="outlined"
            value={search}
              sx={{ width: { xs: "100%", sm: 330 } }}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />    <Box display="flex" gap={2} alignItems="center">
          <DatePicker
            label="Date"
            value={dateFilter}
            onChange={newValue => setDateFilter(newValue)}
            slotProps={{
              textField: {
                size: 'small',
                sx: { minWidth: 140 },

              },
              openPickerIcon: {
        sx: {
          color: 'primary.main', // ✅ change to any MUI color or hex value
        },
      },
            }}
            format="YYYY-MM-DD"
            clearable
          />
          <TextField
            select
            size="small"
            label="Doctor"
            value={doctorFilter}
            onChange={e => setDoctorFilter(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='Dr.Nitin'>Dr.Nitin</MenuItem>
            <MenuItem value='Dr.Ram'>Dr.Ram</MenuItem>
            <MenuItem value='Dr.Kumar'>Dr.Kumar</MenuItem>
          </TextField> 
          </Box>
        </Box>
        <TableContainer component={Paper}  sx={{ boxShadow: 0 }}>
          <Table>
            <TableHead>
         <TableRow sx={{ bgcolor: "#E7EEF8" }}>
                <TableCell sx={{ fontWeight: 600 }}>Reg ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 600 }}> Visited Doctor</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Visited Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows && paginatedRows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Link  color="primary" fontWeight={600} sx={{cursor: 'pointer'}} onClick={() => navigate(`/admin/VisitPatientId`, {
                                                     state: {
                                 regId: row.reg_patientId,
                                 name: row.firstName+" "+row.lastName,
                                 mobile: row.mobile,
                                 age: row.age,
                                }
                                                    })}>
                                                      {row.reg_patientId}
                                                    </Link>
                  </TableCell>
                  <TableCell>{row.firstName} {row.lastName}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.doctor}</TableCell>
                  <TableCell>{formatDate(row.date)}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => navigate('/admin/newpatient',{state:{
                      regId: row.reg_patientId,
                      action:"edit"
                    }})}><EditIcon /></IconButton>
                    <IconButton color="primary" onClick={() => navigate('/admin/appointment-step1',{
                       state: {
      regId: row.reg_patientId,
      name: row.firstName+" "+row.lastName,
      mobile: row.mobile,
      age: row.age,
    }
                    })}><FaCalendarPlus />
                    </IconButton>
                     <IconButton color="primary" onClick={() => handleDelete(row.reg_patientId)}>
                                            <RiCloseCircleFill />
                                        </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="body2">
              Showing {start} to {end} of {totalCount} patients
            </Typography>
            <Box>
              <Button variant="outlined" size="small" sx={{ mr: 1 }} 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled = {currentPage === 1}
              >
                Prev
              </Button>
              <Button variant="outlined" size="small"
             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
             disabled={currentPage === totalPages}>
                Next
              </Button>
            </Box>
          </Box> */}
           <PaginationControls
  currentPage={currentPage}
  totalCount={filteredData.length}
  rowsPerPage={rowsPerPage}
  onPageChange={setCurrentPage}
/>
        </TableContainer>
      </Box>
    </LocalizationProvider>
  );
}