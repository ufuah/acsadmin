import axios from 'axios';
const BASE_URL = "https://api.e-palateoasis.com";

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});