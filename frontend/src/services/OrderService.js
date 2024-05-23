import axiosConfig from "../axiosConfig";
import axios from "axios";




export const apiGetOrder = () => axiosConfig.get(`/order`)

export const apiCreateOrder = (data) => axiosConfig.post('/order', data)

