import axios from "axios";

const API_BASE_URL = "http://localhost:5006/api"; // Backend URL

// User Authentication APIs
export const registerUser = (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData);
export const loginUser = (email, password) => axios.post(`${API_BASE_URL}/auth/login`, { email, password });
export const fetchUserProfile = (token) => 
  axios.get(`${API_BASE_URL}/user/profile`, { headers: { Authorization: `Bearer ${token}` } });

