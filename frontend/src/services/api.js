import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Student API
export const studentAPI = {
  // CREATE
  createStudent: async (studentData) => {
    try {
      const response = await apiClient.post('/students', studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create student');
    }
  },

  // READ - All students
  getAllStudents: async (params = {}) => {
    try {
      const response = await apiClient.get('/students', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch students');
    }
  },

  // READ - Single student
  getStudentById: async (id) => {
    try {
      const response = await apiClient.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch student');
    }
  },

  // UPDATE
  updateStudent: async (id, studentData) => {
    try {
      const response = await apiClient.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update student');
    }
  },

  // DELETE
  deleteStudent: async (id, permanent = false) => {
    try {
      const response = await apiClient.delete(`/students/${id}`, {
        params: { permanent }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete student');
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await apiClient.get('/students/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch stats');
    }
  },

  // Get students by program
  getByProgram: async () => {
    try {
      const response = await apiClient.get('/students/by-program');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch program stats');
    }
  },
};

export default apiClient;
