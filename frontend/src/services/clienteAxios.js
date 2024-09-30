import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default clienteAxios;
