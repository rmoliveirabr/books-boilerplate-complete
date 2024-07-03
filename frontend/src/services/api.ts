import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXTAUTH_URL, // NEXT_PUBLIC_API_URL,
});

export default api;
