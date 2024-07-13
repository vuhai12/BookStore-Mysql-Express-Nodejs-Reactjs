import axiosConfig from "../axiosConfig";
import axios from "axios";

export const apiRegister = (email, password) => axiosConfig.post('/auth/register', { email, password })

export const apiLogin = (email, password) => axiosConfig.post('/auth/login', { email, password })

// export const apiLogout = () => axiosConfig.post('/auth/logout',1)

