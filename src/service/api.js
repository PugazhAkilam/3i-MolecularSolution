import axios from 'axios';

const apiUrl = "http://localhost:8000/api"

const api = axios.create({
  baseURL: apiUrl,
  // withCredentials: true
});

export default api;