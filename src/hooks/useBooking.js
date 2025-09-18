import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

export const useBooking = () => {
  const [chartData, setChartData] = useState({
    line: { labels: [], datasets: [] },
    bar: { labels: [], datasets: [] },
    stats: []
  });
  const [loadings, setLoadings] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchBookingData = async () => {
    try {
      setLoadings(true);
      if (!user) {
        throw new Error('User not authenticated');
      }

      // 1. Fetch summary counts
      const countsRes = await axios.get(`${apiUrl}/counts`, {
        withCredentials: true,
      });
      const bookings = countsRes.data.data;

      // 2. Fetch booking records with dates
      const recordsRes = await axios.get(`${apiUrl}/bookings/all-records`, {
        withCredentials: true,
      });
      const bookingRecords = recordsRes.data.data; // Assume array of records with booking_date

      // 3. Create labels for last 7 days
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse(); // Format: 'YYYY-MM-DD'

      // 4. Count bookings for each day
      const dailyBookings = last7Days.map(day =>
        bookingRecords.filter(record => record.BookingDate?.split('T')[0] === day).length
      );
   console.log('dailyBookings:', dailyBookings);
   
      const bookingTypes = ['Flight', 'Hotel', 'Package', 'Visa'];
      const typeCount = [
        bookings.Flight || 0,
        bookings.Hotel || 0,
        bookings.Package || 0,
        bookings.Visa || 0,
      ];

      setChartData({
        line: {
          labels: last7Days.map(date =>
            new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
          ),
          datasets: [{
            label: 'Daily Bookings',
            data: dailyBookings,
            fill: false,
            borderColor: '#c713a9ff',
            tension: 0.3,
            pointBackgroundColor: '#c713a9ff',
          }]
        },
        bar: {
          labels: bookingTypes,
          datasets: [{
            label: 'Booking Types',
            data: typeCount,
            backgroundColor: '#3f51b5',
          }]
        },
        stats: [
          { icon: 'dashboard', title: 'Total Bookings', value: Object.values(bookings).reduce((sum, val) => sum + val, 0) },
          { icon: 'shopping', title: 'Flight Booking', value: bookings.Flight || 0 },
          { icon: 'box', title: 'Hotel Booking', value: bookings.Hotel || 0 },
          { icon: 'users', title: 'Package Booking', value: bookings.Package || 0 },
          { icon: 'cog', title: 'Visa Booking', value: bookings.Visa || 0 },
        ]
      });

      setLoadings(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoadings(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  return { chartData, loadings, error, refetch: fetchBookingData };
};
