import axios from 'axios';

const BASE_URL = 'https://reqres.in';

// Add authorization header for all requests
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const fetchUsers = (page = 1) => {
  return api.get(`/api/users?page=${page}`);
};

export const updateUser = (id, userData) => {
  return api.put(`/api/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return api.delete(`/api/users/${id}`);
};

export default api;