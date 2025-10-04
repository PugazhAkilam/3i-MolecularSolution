import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,  IconButton,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from '@mui/icons-material/Edit';
import { RiCloseCircleFill } from "react-icons/ri";
import { FaCalendarPlus } from "react-icons/fa";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
//import api from "../api"; // import your configured axios instance
import { getRegisteredPatients } from '../service/patientService'; // adjust path as needed
import { getAppointmentsWithPatientDetails } from '../service/appointmentService'; // adjust path as needed
import { formatDate } from '../utils/formatDate';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { isSameDay } from 'date-fns';


const DOCTORS = ["Dr.Ram", "Dr.Kumar", "Dr.Nitin"];

export default function VisitorHistory() {
  const [patientRows, setPatientRows] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API when component mounts
  
    useEffect(() => {
      const fetchRegisteredPatients = async () => {
        try {
          const data = await getAppointmentsWithPatientDetails();
          setPatientRows(data);
        } catch (err) {
          console.log('error', err);
        }
      };
      fetchRegisteredPatients();
    }, []);
  

  // Filter rows based on search, doctor, and date
  const filteredRows = patientRows.filter((row) => {
    console.log("date", row.date);
    
    const matchesSearch =
      !search ||                                  
      row.firstName?.toLowerCase().includes(search.toLowerCase()) || 
      row.lastName?.toLowerCase().includes(search.toLowerCase())  ||
      row.mobile?.includes(search);
    const matchesDoctor = !selectedDoctor || row.doctor === selectedDoctor;
const matchesDate =
  !selectedDate ||
  (row.date && isSameDay(new Date(row.date), new Date(selectedDate)));

    return matchesSearch && matchesDoctor && matchesDate;
  });

  return (
    <Box p={3} sx={{ bgcolor: "#fff", minHeight: "100vh", py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Visitor History
      </Typography>
      <Typography variant="h6" fontWeight="bold" mb={2}>
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: "100%", sm: 330 } }}
        />

        <Box display="flex" gap={2} alignItems="center">
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      slotProps={{
              textField: {
                size: 'small',
                sx: { minWidth: 140 },
              },
            }}
      value={selectedDate}
      onChange={(newValue) => setSelectedDate(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          placeholder="Select Date"
          sx={{
            minWidth: 160,
           
          }}
         
        />
      )}
    />
  </LocalizationProvider>

  <Select
    size="small"
    value={selectedDoctor}
    onChange={(e) => setSelectedDoctor(e.target.value)}
    displayEmpty
    IconComponent={ArrowDropDownIcon}
    renderValue={(selected) => (selected ? selected : "Doctor")}
    sx={{
      minWidth: 110,
      height: 36,
      fontSize: '0.85rem',
      borderRadius: 2,
      bgcolor: "#fff",
      color: "#222",
      '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
        padding: '6px 8px',
      },
      '& .MuiOutlinedInput-root': {
        height: 36,
        borderRadius: 2,
        fontSize: '0.85rem',
      },
      '& .MuiSvgIcon-root': {
        fontSize: 20,
        color: '#888',
      },
    }}
  >
    <MenuItem value="">Doctor</MenuItem>
    {DOCTORS.map((doc) => (
      <MenuItem value={doc} key={doc}>
        {doc}
      </MenuItem>
    ))}
  </Select>
</Box>

      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#E7EEF8" }}>
              <TableCell sx={{ fontWeight: 600 }}>Reg ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Visited Doctor</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Visited Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row,i) => (
               <TableRow key={i}>
                               <TableCell>
                                 <Link  color="primary" fontWeight={600} sx={{cursor: 'pointer'}} onClick={() => navigate(`/admin/VisitPatientId`, {
                                  state: {
              regId: row.patientId,
              name: row.firstName + " " + row.lastName,
              mobile: row.mobile,
              age: row.age,
             }
                                 })}>
                                   {row.patientId}
                                 </Link>
                               </TableCell>
                               <TableCell>{row.firstName} {row.lastName}</TableCell>
                               <TableCell>{row.mobile}</TableCell>
                               <TableCell>{row.age}</TableCell>
                               <TableCell>{row.doctor}</TableCell>
                               <TableCell>{formatDate(row.date)}</TableCell>
                               {/* <TableCell>
                                 <IconButton color="primary" onClick={() => navigate('/admin/appointment-step1')}><EditIcon /></IconButton>
                                 <IconButton color="primary" onClick={() => navigate('/admin/appointment-step1')}><FaCalendarPlus size={20} /></IconButton>
                                 <IconButton color="primary"><RiCloseCircleFill /></IconButton>
                               </TableCell> */}
                             </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontSize={14}
        color="text.secondary"
      >
        <span>Showing {filteredRows.length} patients</span>
        <Box>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 2,
              minWidth: 80,
              mr: 1,
              px: 2,
              textTransform: "none",
            }}
          >
            &lt; Prev
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 2,
              minWidth: 80,
              px: 2,
              textTransform: "none",
            }}
          >
            Next &gt;
          </Button>
        </Box>
      </Box>
    </Box>
  );
}