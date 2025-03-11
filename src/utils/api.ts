import axios from 'axios';

const api = axios.create({
    baseURL: 'http://103.209.40.89:3456/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;
