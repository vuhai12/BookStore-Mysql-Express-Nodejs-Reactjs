import db from '../models';
import { Op } from 'sequelize';
import { v4 as generateId } from 'uuid';
const cloudinary = require('cloudinary').v2;

export const addCart = (body, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findByPk(id)
      let cart = await user.getCart()
      if (!cart) {
        await user.createCart();
      }
      let book = await cart.getBooks({
        where: {
          id: parseInt(body.bid)
        }
      })
      
      if (book.length) {
        // let newQuantity = book[0].cartDetail.quantity +1
        await cart.addBook(book[0], { through: { quantity: parseInt(body.quantity), isChecked:Boolean(+body.isChecked),totalPrices:+body.totalPrices  } });
      } else {
        const bookCart = await db.Book.findByPk(parseInt(body.bid))
        await cart.addBook(bookCart, { through: { quantity: parseInt(body.quantity), isChecked: Boolean(+body.isChecked),totalPrices:+body.totalPrices } });
      }
      const response = await db.CartDetail.findAndCountAll({
        where: {
          bookCartId: body.bid,
          quantity: body.quantity
        }
      })
      resolve({
        error: response.count ? 0 : 1, //true: 0 false: 1
        message: response.count ? 'Success' : 'Cannot create or update Cart',
      });
    } catch (error) {
      reject(error);
    }
  });

export const getCart = (body, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.CartDetail.findAll({
        include: [
          { model: db.Book, }
        ],
      })

      resolve({
        error: response ? 0 : 1, //true: 0 false: 1
        message: response ? 'Success' : 'Cannot create or update Cart',
        cartData: response
      });
    } catch (error) {
      reject(error);
    }
  });

