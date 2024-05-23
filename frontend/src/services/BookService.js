import axiosConfig from "../axiosConfig";
import axios from "axios";


export const apiDeleteBook = (id) => axiosConfig.delete(`/book`, { params: { bids: id } })

export const apiUpdateBook = (data) => axiosConfig.put('/book', data)

export const apiCreateBook = (data) => axiosConfig.post('/book', data)

export const apiGetBook = (limit, pageCurent, searchString, category, field, sort) => {
    if (category) {
        return axiosConfig.get(`/book?limit=${limit}&page=${pageCurent}&name=${searchString}&category_code=${category}`)
    }
    else if (field && sort) {
        return axiosConfig.get(`/book?limit=${limit}&page=${pageCurent}&order[]=${field}&order[]=${sort}`)
    }
    else {      
        return axiosConfig.get(`/book?limit=${limit}&page=${pageCurent}&name=${searchString}`)
    }
}

export const apiGetBookById = (id) => axiosConfig.get(`/book/${id}`)



