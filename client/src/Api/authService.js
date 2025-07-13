import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:2000/api',
});

// Register function
export const registerUser = async ({ username, email, password }) => {
  const response = await API.post('/auth/register', { username, email, password });
  return response.data;
};

// Login function
export const loginUser = async ({ email, password }) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};
