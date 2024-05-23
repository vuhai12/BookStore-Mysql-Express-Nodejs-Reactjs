import axiosConfig from "../axiosConfig";
import axios from "axios";


export const apiAddCart = (data) => axiosConfig.post(`/cart`, data)

export const apiGetCart = () => axiosConfig.get(`/cart`)