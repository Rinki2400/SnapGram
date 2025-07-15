import axios from 'axios';

// Axios instance
const API = axios.create({
  baseURL: 'http://localhost:2000/api',
});

// Set token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =====================
// 🔐 Auth APIs
// =====================

// Register user
export const registerUser = async ({ username, email, password }) => {
  const response = await API.post('/auth/register', { username, email, password });
  return response.data;
};

// Login user
export const loginUser = async ({ email, password }) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

// =====================
// 👤 User APIs
// =====================

// Get user by ID
export const getUserById = async (id) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};

// Update user
export const updateUserById = async (id, userData) => {
  const response = await API.put(`/users/${id}`, userData);
  return response.data;
};

// =====================
// 📝 Post APIs
// =====================

// Create post (with image)
export const createPost = async (formData) => {
  const response = await API.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get all posts (feed)
export const getAllPosts = async () => {
  const response = await API.get('/posts');
  return response.data;
};

// Get posts by user
export const getUserPosts = async (userId) => {
  const response = await API.get(`/posts/user/${userId}`);
  return response.data;
};

// Like or unlike post
export const likePost = async (postId, userId) => {
  const response = await API.post(`/posts/${postId}/like`, { userId });
  return response.data;
};
