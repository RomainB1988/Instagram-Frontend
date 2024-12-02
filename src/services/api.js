import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // URL de ton API Rails
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
