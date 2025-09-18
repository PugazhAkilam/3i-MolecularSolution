// src/services/patientService.js
import api from './api';

export const getRegisteredPatients = async () => {
  // Optionally: error handling can be improved here!
  const res = await api.get('/registeredPatients');
  return res.data; // assuming the API returns a JSON object with {data: ...}
};
