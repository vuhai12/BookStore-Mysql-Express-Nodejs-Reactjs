import jwt, { TokenExpiredError } from "jsonwebtoken";
import { notAuthorized } from "./handle_errors"
require('dotenv').config();
const verifyToken = (req, res, next) => {
    console.log('1111111111111')
    const token = req.headers.authorization
    console.log('token',token)
    if(!token) return notAuthorized('Require authorization', res)
    const accessToken = token.split(' ')[1] //vì token ở dạng bearer, nên phải chém nó ra thành mảng, lấy ở vị trí thứ 1
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if(err){
            console.log('3333333333333333333333333')
            const isChecked = err instanceof TokenExpiredError 

            console.log('isChecked',isChecked)
            
            if(!isChecked) return notAuthorized('Access token invalid', res, isChecked)
            if(isChecked) return notAuthorized('Access token expired', res, isChecked)
        }
        
        req.user = user
        next()
    })
}

export default verifyToken