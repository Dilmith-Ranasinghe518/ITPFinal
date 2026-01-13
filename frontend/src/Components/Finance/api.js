import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5008/transactionsdb', // Backend API URL
});

export default api;
