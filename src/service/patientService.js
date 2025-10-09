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

export const getPatientDetails = async (regId) => {
  const res = await api.get(`/patient/patientDetails/${regId}`);
  return res.data;
};

export const getMedicalHistory= async (patientId) => {
    try {
      const res = await api.get(`/patient/getMedhistory/${patientId}`);
      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      console.error("Error fetching medical history:", error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch medical history'
      };
    }
  };

 export const  saveConsultation = async (consultationData) => {
    try {
      const res = await api.post('/patient/saveConsultation', consultationData);
      return {
        success: true,
        data: res.data,
        message: res.data.message
      };
    } catch (error) {
      console.error("Error saving consultation:", error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to save consultation'
      };
    }
  };

  
