import axios from 'axios';
import {AuthResponse} from "@utils/api/models/response/AuthResponse";

// axios.defaults.baseURL = 'http://localhost:8080';

export const API_URL = 'http://localhost:8080';
const $api = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER || API_URL,
    withCredentials: true
});

$api.interceptors.request.use((config) => {
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<AuthResponse>('http://localhost:8080/api/refresh', {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Необходима авторизация')
        }
    }
    throw error;
});

$api.interceptors.response.use((config) => {
    return config
})

export default $api;