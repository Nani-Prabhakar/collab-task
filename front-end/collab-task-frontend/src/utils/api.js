// src/utils/api.js
import useAuthStore from '../store/authStore'; // <-- ADD THIS IMPORT

const API_BASE = 'http://localhost:5000/api';

const apiRequest = async (url, options = {}) => {
  const { token } = useAuthStore.getState(); // Get token from Zustand store
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  const response = await fetch(`${API_BASE}${url}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  
  return response.json();
};

// Auth endpoints (public)
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(userData) })
};

// Protected endpoints (require token)
export const tasksAPI = {
  getAll: () => apiRequest('/tasks'),
  create: (taskData) => apiRequest('/tasks', { method: 'POST', body: JSON.stringify(taskData) }),
  update: (id, taskData) => apiRequest(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(taskData) }),
  delete: (id) => apiRequest(`/tasks/${id}`, { method: 'DELETE' })
};

export default apiRequest;
