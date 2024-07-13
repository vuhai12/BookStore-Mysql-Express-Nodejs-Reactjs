import axiosConfig from "../axiosConfig";
import axios from "axios";




export const apiGetProfileUser = () => axiosConfig.get(`/profile-user`)