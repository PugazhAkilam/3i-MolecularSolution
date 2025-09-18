import React, { use, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField, Tooltip,
  Link,
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import patients from '../utils/patientsData';
import { RiCloseCircleFill } from "react-icons/ri";
// Import isSameDay helper
import { isSameDay, parseISO } from "date-fns";
import Swal from 'sweetalert2';
import { useEffect } from "react";

const rowsPerPage = 10;


export default function PatientsList() {
  const [search, setSearch] = useState("");
  const [ userData, setUserData ] = useState([]);

  // Fetch data from API filtered by selectedDate
 

  // Filter patients by name or mobile


const navigate=useNavigate();
 const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
   useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const url = `http://localhost:8000/api/patientList?date=${formattedDate}`;
        const res = await fetch(url);
        const data = await res.json();
        setUserData(data.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setUserData([]);
      }
    };

    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);

  // Handler for calendar button
  const handleCalendarClick = () => {
    setShowDatePicker(true);
    setSelectedDate(new Date()); // focus today
  };
const handleDelete = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to delete this appointment?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      // Perform the delete action here (e.g., API call or state update)
      Swal.fire('Deleted!', 'The appointment has been deleted.', 'success');
    }
  });
};

  const [currentPage, setCurrentPage] = useState(1);
  // ... existing states like showDatePicker, selectedDate


// const filtered = patients.filter((p) => {
//   const matchesSearch =
//     p.name.toLowerCase().includes(search.toLowerCase()) ||
//     p.mobile.includes(search);

//   // If no selectedDate filter, include all dates
//   if (!selectedDate) {
//     return matchesSearch;
//   }

//   // Check if appointmentDate matches selectedDate (using isSameDay)
//   const appointmentDate = parseISO(p.appointmentDate);
//   const dateMatches = isSameDay(appointmentDate, selectedDate);

//   return matchesSearch && dateMatches;
// });
 // Search filtering only (no date filtering client-side now)
  const filtered = userData.filter((p) =>
    p.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    p.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    p.mobile?.includes(search)
  );

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset to first page on search or userData change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, userData]);

  // Toggle date picker open
  // const handleCalendarClick = () => {
  //   setShowDatePicker(true);
  // };
  // // const totalPages = Math.ceil(filtered.length / rowsPerPage);

  // // Slice filtered data for current page
  // const paginatedData = filtered.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );

  // Handle Prev button click
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Handle Next button click
  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Inside PatientsList component:

  return (
    <Box sx={{ 
      //  bgcolor: "#0c83faff", 
    
    minHeight: "100vh",  }}>
      <Box
        sx={{
          // maxWidth: 1100,
          mx: "auto",
          p: { xs: 1, md: 3 },
          borderRadius: 3,
          bgcolor: "#fff",
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Appointment
        </Typography>
        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1} >
          {/* <Typography variant="h6" fontWeight="bold">
            Patients List
          </Typography> */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "rgb(11,58,132)",
              borderRadius: 2,
              px: 2,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "rgb(11,58,132)" },
            }}
            onClick={() => navigate('/admin/searchpatient')}
          >
            Add Appointment
          </Button>
          
        </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} mb={2}>
  {/* <TextField
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
    sx={{ width: { xs: "100%", sm: 370 }, mb: 2 }}
  /> */}

  {!showDatePicker && (
    <Button
      variant="outlined"
      startIcon={<CalendarTodayIcon />}
      endIcon={<ArrowDropDownIcon />}
      sx={{ borderRadius: 2, fontWeight: 600, textTransform: "none" }}
      onClick={handleCalendarClick}
    >
      {format(selectedDate, 'MMM d, yyyy') === format(new Date(), 'MMM d, yyyy')
        ? "Today's Appointment"
        : format(selectedDate, 'MMM d, yyyy')}
    </Button>
  )}

  {showDatePicker && (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        open={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        value={selectedDate}
        onChange={setSelectedDate}
        renderInput={(params) => <div style={{ display: "none" }} />}
      />
    </LocalizationProvider>
  )}
</Box>


<Box display="flex" alignItems="center" justifyContent="space-between" mt={2} mb={2}>
  <Typography variant="h6" fontWeight="bold">
    {search ? "Search Results" : "Patient List"}
  </Typography>

  {search && (
    <Button variant="text" onClick={() => setSearch("")}>
      Close
       <IconButton
      color="primary"
     
      size="small"
      aria-label="clear search filter"
    >
      <CloseIcon />
    </IconButton>
    </Button>
  )}
   
    
</Box>

        <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f7fa" }}>
                {/* ... table headers unchanged */}
                <TableCell sx={{ fontWeight: 600 }}>Reg ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Visited Doctor</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>BP</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Pulse</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Respiratory Rate</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData && userData.map((row,index) => (
                <TableRow key={index} hover>
                  {/* ... table cells unchanged */}
                  <TableCell>
                    <Link href="#"  color="primary" fontWeight={600}>
                      {row.patientId}
                    </Link>
                  </TableCell>
                  <TableCell>{row.firstName} {row.lastName}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.doctor}</TableCell>
                  <TableCell>{row.bloodPressure}</TableCell>
                  <TableCell>{row.pulse}</TableCell>
                  <TableCell>{row.respiratoryRate}</TableCell>
                <TableCell>
  <Tooltip title="Edit">
    <IconButton color="primary"  onClick={() => navigate('/admin/appointment-step1')}>
     <EditIcon />
    </IconButton>
  </Tooltip>
{((row.bp ==null)||(!row.bmi)) && (
    <Tooltip title="Scan Vital">
      <IconButton
        color="primary"
        onClick={() => navigate('/admin/appointment-step2')}
      >
        <CameraAltIcon />
      </IconButton>
    </Tooltip>
  )}
  

  <Tooltip title="Delete">
  <IconButton color="primary" onClick={handleDelete}>
    <RiCloseCircleFill />
  </IconButton>
</Tooltip>

</TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
          {/* Pagination controls */}
        <Box
          mt={1.5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          fontSize={14}
          color="text.secondary"
        >
          <Box>
            Showing {paginatedData.length} of {filtered.length} results | Page {currentPage} of {totalPages}
          </Box>
          <Box>
            <Button
              variant="outlined"
              size="small"
              sx={{ minWidth: 80, mr: 1, borderRadius: 2 }}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ minWidth: 80, borderRadius: 2 }}
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next &gt;
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

