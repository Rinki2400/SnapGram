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

// Get user by ID
export const getUserById = async (id) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};


// PUT: Update user
export const updateUserById = async (id, userData) => {
  const response = await API.put(`/users/${id}`, userData);
  return response.data;
};
