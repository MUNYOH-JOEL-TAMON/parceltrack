import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API Service Functions
export const trackingService = {
  trackShipment: (trackingNumber: string, courier?: string) =>
    api.get(`/tracking/${trackingNumber}`, { params: { courier } }),
};

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, newPassword: string) =>
    api.post('/auth/reset-password', { token, newPassword }),
};

export const shipmentService = {
  getAllShipments: (params?: { page?: number; limit?: number; status?: string; courier?: string }) =>
    api.get('/shipments', { params }),
  
  getShipmentById: (id: string) =>
    api.get(`/shipments/${id}`),
  
  registerShipment: (data: { trackingNumber: string; courier?: string; origin?: string; destination?: string; internalReference?: string }) =>
    api.post('/shipments', data),
  
  updateShipment: (id: string, data: any) =>
    api.put(`/shipments/${id}`, data),
  
  deleteShipment: (id: string) =>
    api.delete(`/shipments/${id}`),
  
  refreshTracking: (id: string) =>
    api.post(`/shipments/${id}/refresh`),
};

export const courierService = {
  getAllCouriers: () =>
    api.get('/couriers'),
  
  getCourierById: (id: string) =>
    api.get(`/couriers/${id}`),
  
  updateCourierStatus: (id: string, isActive: boolean) =>
    api.patch(`/couriers/${id}/status`, { isActive }),
};

export const statsService = {
  getDashboardStats: () =>
    api.get('/stats/dashboard'),
  
  getRecentActivity: () =>
    api.get('/stats/activity'),
};

export const syncLogService = {
  getSyncLogs: (params?: { page?: number; limit?: number; status?: string; courier?: string }) =>
    api.get('/sync-logs', { params }),
  
  retrySyncLog: (id: string) =>
    api.post(`/sync-logs/${id}/retry`),
};
