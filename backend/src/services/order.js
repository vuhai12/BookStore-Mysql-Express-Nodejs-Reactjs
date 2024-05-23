import db from '../models';
import { Op } from 'sequelize';
import { v4 as generateId } from 'uuid';
const cloudinary = require('cloudinary').v2;

export const createNewOrder = (body, id,carts) =>

  new Promise(async (resolve, reject) => {
    try {
     console.log('id',id)
      const order = await db.Order.create({
        ...body,
        userId: id
      });

      let orderDetail = []
      carts.forEach((item) => {
        orderDetail.push({
          orderId: order.id,
          bookId: item.bookId,
          quantity: item.quantity,
          price: item.price,
          total: (+item.quantity * (+item.price))
        })
      })
      const orderDetails = await db.OrderDetail.bulkCreate(orderDetail)
      resolve({
        error: (order && orderDetails) ? 0 : 1, //true: 0 false: 1
        message: (order && orderDetails) ? 'Created' : 'Cannot create new order',
      });
    } catch (error) {
      reject(error);
    }
  });

export const getOrderById = (userId) =>

  new Promise(async (resolve, reject) => {
    try {

      const response = await db.Order.findAll({
        where: {
          userId,
        },
      });
      resolve({
        error: (response) ? 0 : 1, //true: 0 false: 1
        message: (response) ? 'Got' : 'Order not found',
        orderData: response
      });
    } catch (error) {
      reject(error);
    }
  });

  export const getOrders = ({ page, limit, order, ...query }) =>
    new Promise(async (resolve, reject) => {
      try {
        const queries = { raw: true, nest: true };
        const offset = !page || +page <= 1 ? 0 : +page - 1;
        const fLimit = +limit || +process.env.LIMIT_ORDER; //nếu truyền vào limit thì lấy, còn nếu không thì lấy limit trong file .env
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        const response = await db.Order.findAndCountAll({
          where: query,
          ...queries,
        });
  console.log('response orrrrrrrrrrrr',response)
        resolve({
          error: response ? 0 : 1,
          message: response ? 'Got' : 'Order not found',
          orderData: response,
        });
      } catch (error) {
        reject(error);
      }
    });




