import axiosConfig from "../axiosConfig";
import axios from "axios";




export const apiGetOrders = () => axiosConfig.get(`/order`)

export const apiGetOrderById = () => axiosConfig.get(`/order/id`)

export const apiCreateOrder = (data) => axiosConfig.post('/order', data)

