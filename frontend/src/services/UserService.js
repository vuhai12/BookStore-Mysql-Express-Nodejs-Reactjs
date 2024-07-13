import axiosConfig from "../axiosConfig";
import axios from "axios";


export const apiGetUser = (limit, pageCurent, searchString, field, sort) => {
  
     if (field && sort) {
        return axiosConfig.get(`/user?limit=${limit}&page=${pageCurent}&order[]=${field}&order[]=${sort}`)
    }
    else {      
        return axiosConfig.get(`/user?limit=${limit}&page=${pageCurent}&name=${searchString}`)
    }
}

export const apiGetUserById = () => {
  
    return axiosConfig.get(`/user/account`)
}


// export const apiGetUser = (limit, pageCurent, searchString) =>

//     axiosConfig.get(`/user?limit=${limit}&page=${pageCurent}&name=${searchString}`)

export const apiCreateUser = (data) => axiosConfig.post('/user', data)

export const apiUpdateUser = (data) => axiosConfig.put('/user', data)

export const apiDeleteUser = (id) => axiosConfig.delete(`/user`, { params: { bids: id } })

export const apiLogout = () => axiosConfig.post('/auth/logout')