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