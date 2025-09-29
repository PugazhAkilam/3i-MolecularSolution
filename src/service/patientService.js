// src/services/patientService.js
import api from './api';

export const getRegisteredPatients = async () => {
  // Optionally: error handling can be improved here!
  const res = await api.get('/patient/registeredPatients');
  return res.data; // assuming the API returns a JSON object with {data: ...}
};
export const deletePatient = async (patientId) => {
    const res = await api.delete(`/patient/deletePatient/${patientId}`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to delete patient');
    }
    return data;
};

// export const getPatientsStats = async () => {
//   try {
//     const res = await api.get('/patient/dashboard/patients-stats');
//     return res.data;
//   }

//   catch (err) {
//     console.error("Failed to fetch patients-stats",err);
//     throw err;
//   }
// };

// export const insertPatientLogin = async () => {
//   try {
//     const response = await api.post('/patient/login');
//     return response;
//   } catch (err) {
//     console.error("Failed to delete appointment", err);
//     throw err;
//   }
// };

// export const getMedicalHistoryById = async (patientId) => {
//   try {
//     const res = await api.get(`/patient/getMedhistory/${patientId}`);
//     return res;
//   }

//   catch (err) {
//     console.error("Error in fetching medical history data", err);
//     throw err;
//   }
// };