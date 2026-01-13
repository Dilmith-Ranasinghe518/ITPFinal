import axios from 'axios';

const api = axios.create({
  baseURL: '/api/transactionsdb', // Backend API URL
});

export default api;
