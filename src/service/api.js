import axios from 'axios';
import { API_URL } from '../components/config';
const apiUrl = "http://localhost:8000/api"

const api = axios.create({
  baseURL: API_URL,
  // withCredentials: true
});

export default api;