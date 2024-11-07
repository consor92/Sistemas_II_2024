import axios from 'axios';

const api = axios.create({
  baseURL: '127.0.0.1:3000/perfumes',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
