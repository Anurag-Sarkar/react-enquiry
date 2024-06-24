import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https:www.sheryians.com/feedback', // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

