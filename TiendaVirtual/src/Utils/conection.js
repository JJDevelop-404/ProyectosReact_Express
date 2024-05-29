import axios from 'axios';
export const BACK_URL = "http://localhost:3000";

export const api = axios.create({
    baseURL: BACK_URL,
    withCredentials: true
})