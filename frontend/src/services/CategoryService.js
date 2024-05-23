import axiosConfig from "../axiosConfig";
import axios from "axios";

export const apiGetCategory = () => axiosConfig.get(`/category`)