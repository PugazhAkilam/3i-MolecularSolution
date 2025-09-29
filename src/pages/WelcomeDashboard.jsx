import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';
import { FaUsers, FaUserPlus } from 'react-icons/fa';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Appointment from '../components/Appointment';
import CountUp from 'react-countup';
import axios from 'axios';
import { API_URL } from '../components/config';
// import { getPatientsStats } from '../service/patientService';
// import { getTodaysAppointmentapi } from '../service/appointmentService';
ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ageGroups = [
  { label: '0-18', min: 0, max: 18 },
  { label: '19-30', min: 19, max: 30 },
  { label: '31-45', min: 31, max: 45 },
  { label: '46-60', min: 46, max: 60 },
  { label: '60+', min: 61, max: 150 },
];

const Dashboard = () => {
  const [statData, setStatData] = useState([
    { label: 'Total Patients', value: 0, icon: <FaUsers size={28} color="#808099" /> },
    { label: 'New Patients (This month)', value: 0, icon: <FaUserPlus size={28} color="#80c77e" /> },
    { label: "Today's Appointments", value: 0, icon: <CalendarMonthIcon style={{ fontSize: 28, color: '#8e89cc' }} /> },
  ]);

  const [ageBarData, setAgeBarData] = useState({
    labels: ageGroups.map(g => g.label),
    datasets: [{ label: 'Patients', data: [], backgroundColor: 'rgb(11,58,132)', borderRadius: 6 }],
  });

  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], borderWidth: 0 }],
  });

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: { display: true, color: '#222', anchor: 'end', align: 'top', font: { weight: 'bold' } },
    },
    scales: {
      x: {
        grid: { display: false },
        title: { display: true, text: 'Age', color: '#555', font: { size: 16, weight: 'bold' }, padding: { top: 10 } },
      },
      y: {
        grid: { color: '#edf2fa' },
        beginAtZero: true,
        title: { display: true, text: 'Patients count', color: '#555', font: { size: 16, weight: 'bold' }, padding: { bottom: 10 } },
      },
    },
    borderRadius: 9,
    barPercentage: 0.55,
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 30,
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => ({
                text: label,
                fillStyle: data.datasets[0].backgroundColor[i],
                lineWidth: data.datasets[0].borderWidth || 0,
                hidden: false,
                index: i,
              }));
            }
            return [];
          },
        },
      },
      datalabels: { display: true, color: '#222', font: { weight: 'bold', size: 14 }, formatter: (value) => value },
    },
    cutout: '70%',
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          { data: patientStats },
          { data: appointmentStats }
        ] = await Promise.all([
          axios.get(`${API_URL}/patient/dashboard/patients-stats`),
          axios.get(`${API_URL}/appointment/dashboard/todays-appointments`)
        ]);
        // const data1 =  getPatientsStats();
        // console.log("data1",data1);
        // const data2 = getTodaysAppointmentapi();
        // console.log("data2", data2);
        
        // Update stats cards
        setStatData([
          { label: 'Total Patients', value: patientStats.totalPatients, icon: <FaUsers size={28} color="#808099" /> },
          { label: 'New Patients (This month)', value: patientStats.newPatientsThisMonth, icon: <FaUserPlus size={28} color="#80c77e" /> },
          { label: "Today's Appointments", value: appointmentStats.todaysAppointments, icon: <CalendarMonthIcon style={{ fontSize: 28, color: '#8e89cc' }} /> },
        ]);

        // Calculate age distribution
        const ages = (patientStats.patients || []).map(p => p.age || 0);
        const ageCounts = ageGroups.map(g => ages.filter(age => age >= g.min && age <= g.max).length);
        setAgeBarData({
          labels: ageGroups.map(g => g.label),
          datasets: [{ label: 'Patients', data: ageCounts, backgroundColor: 'rgb(11,58,132)', borderRadius: 6 }],
        });

        // Setup pie chart for doctor appointments
        const doctors = appointmentStats.appointmentsByDoctor || [];
        const labels = doctors.map(d => d.doctor);
        const data = doctors.map(d => d.count);
        const colors = ['rgb(11,58,132)', '#1de9b6', '#ffb300', '#ff6384', '#36a2eb']; // add more if needed

        setPieData({
          labels,
          datasets: [{ data, backgroundColor: colors.slice(0, labels.length), borderWidth: 0 }],
        });
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
        {statData.map((s, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Paper
              elevation={0}
              sx={{ borderRadius: 3, p: 2, display: 'flex', alignItems: 'center', gap: 2, boxShadow: 1, bgcolor: '#fff' }}
            >
              <Box sx={{ width: 50, height: 50, bgcolor: '#f4f7fe', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.icon}
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="#212244">
                  <CountUp end={s.value} duration={2} separator="," />
                </Typography>
                <Typography color="#686f87" fontSize={15}>{s.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{ borderRadius: 3, p: { xs: 2, md: 3 }, bgcolor: '#fff', height: { xs: 350, md: 400 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 1 }}
          >
            <Typography fontWeight="bold" sx={{ mb: 2, alignSelf: 'flex-start' }}>Age Group Distribution</Typography>
            <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: 600 }, height: { xs: 270, md: 320 } }}>
              <Bar data={ageBarData} options={barOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{ borderRadius: 3, p: { xs: 2, md: 3 }, bgcolor: '#fff', height: { xs: 350, md: 400 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 1 }}
          >
            <Typography fontWeight="bold" sx={{ mb: 6, alignSelf: 'flex-start' }}>Doctor Appointment Split</Typography>
            <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: 400 }, height: { xs: 180, md: 240 } }}>
              <Doughnut data={pieData} options={pieOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Appointment />
    </Box>
  );
};

export default Dashboard;
