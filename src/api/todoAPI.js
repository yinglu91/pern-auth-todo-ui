import axios from 'axios';

console.log('yyyy ', process.env.REACT_APP_TODO_BASE_URL)
// axios instance for todo api
const todoAPI = axios.create({
  baseURL: process.env.REACT_APP_TODO_BASE_URL
});

export default todoAPI;
