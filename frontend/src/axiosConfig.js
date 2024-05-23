import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config;
  }, (error) => {
    
    return Promise.reject(error);
  });

instance.interceptors.response.use((response) => {
  
  if (response.data && response.data.message == 'Refresh token expired. Require login again') {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('auth')
    window.location.href = "/login";
  }
  return response.data;
}
  , async (error) => {
  
    const originalConfig = error.config
    if (error.response.status == 401) {
  
      if (error.response.data.message == 'Access token expired') {
        const refresh_token = localStorage.getItem('refresh_token')
        const { access_token } = await instance.post('/auth/refresh-token', {
          refreshToken: refresh_token
        })
        if (access_token) {
          localStorage.setItem('access_token', access_token)
          originalConfig.headers.Authorization = access_token
          return instance(originalConfig)
        }
      }
    }
    return Promise.reject(error)
  }
);

export default instance

