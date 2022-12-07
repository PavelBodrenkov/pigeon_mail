import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8080';

export const API_URL = 'http://localhost:8080';
const $api = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER || API_URL,
    withCredentials:true
});

$api.interceptors.request.use((config) => {
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('auth-token')}`;
    return config;
});

export default $api;