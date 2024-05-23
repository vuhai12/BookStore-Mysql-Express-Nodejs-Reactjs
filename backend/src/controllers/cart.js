import { bid, quantity,isChecked } from "../helpers/joi_schemas";
import Joi from "joi";
import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";

export const addCart = async (req, res) => {
    try {
        const { id } = req.user
        const { error } = Joi.object({ bid,quantity,isChecked }).validate(req.body )
        if (error) {
            // if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        }
        const response = await services.addCart(req.body,id)
        console.log('response',response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return internalServerError(res)
    }
}

export const getCart = async (req, res) => {
    try {
        const response = await services.getCart()
       
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}