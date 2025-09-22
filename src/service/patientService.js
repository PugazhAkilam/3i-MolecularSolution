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