import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { quantity, total, paymentMethod, isPaid, isDelivered } from "../helpers/joi_schemas";
import Joi from "joi";
const cloudinary = require('cloudinary').v2;


export const createNewOrder = async (req, res) => {

    try {
        const { id } = req.user
        const { carts, ...rest } = req.body
       
        const { error } = Joi.object({ rest })
            .validate({ rest })
        if (error) {
            return badRequest(error.details[0].message, res)
        }
        const response = await services.createNewOrder(rest, id, carts)
        return res.status(200).json(response)

    } catch (error) {
        return internalServerError(res)
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.user
        
        const response = await services.getOrderById(id)

        console.log('response order',response)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getOrders = async (req, res) => {
    try {
        console.log('656565555555555555555555555555555555')
        const response = await services.getOrders(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

