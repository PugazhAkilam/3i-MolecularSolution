import api from './api'; // Adjust the path if necessary

/**
 * Fetches appointments that have pulse data, along with patient details.
 *
 * @returns {Promise<object[]>} An array of appointment objects, each including patient details.
 * @throws {Error} If the API call fails.
 */
export const getAppointmentsWithPatientDetails = async () => {
  try {
    const response = await api.get('/appointment/visitDetails');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching appointments with patient details:', error);
    throw error;
  }
};

export const patientList = async (formattedDate) => {
  try {
    const response = await api.get(`/patient/patientList?date=${formattedDate}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
};

export const deleteAppointmentapi = async (id) => {
  try {
    const response = await api.delete(`/appointment/deleteAppointment/${id}`);
    return response.data;
  } catch (err) {
    console.error("Failed to delete appointment", err);
    throw err;
  }
};

export const getTodaysAppointmentapi = async () => {
  try {
    const response = await api.get('/appointment/dashboard/todays-appointments');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Today's appointment data.");
    throw error;
  }
};

export const getAppointmentDetails = async (patientId) => {
  try {
    const response = await api.get(`/appointment/appointmentDetails/${patientId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching appointment details:', error);
    throw error;
  }
};

export const getAppointment= async (appointmentId) => {
  try {
    const response = await api.get(`/appointment/getappointment/${appointmentId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching appointment details:', error);
    throw error;
  }
};