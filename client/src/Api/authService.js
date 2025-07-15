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



// Create a new post
export const createPost = async (formData) => {
  const response = await API.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get all posts (for feed)
export const getAllPosts = async () => {
  const response = await API.get('/posts');
  return response.data;
};

// Get posts by a specific user
export const getUserPosts = async (userId) => {
  const response = await API.get(`/posts/user/${userId}`);
  return response.data;
};
