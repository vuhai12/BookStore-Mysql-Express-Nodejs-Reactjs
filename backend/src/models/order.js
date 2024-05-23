'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.User, { foreignKey: 'userId' });
            Order.belongsToMany(models.Book, { through: 'OrderDetail', foreignKey: 'orderId', otherKey: 'bookId' });
            Order.hasMany(models.OrderDetail, { foreignKey: 'orderId' });
        }
    }
    Order.init({
        quantity: DataTypes.INTEGER,
        total: DataTypes.DECIMAL,
        paymentMethod: DataTypes.STRING,
        paymentDetails: DataTypes.TEXT,
        isPaid:DataTypes.BOOLEAN,
        isDelivered:DataTypes.BOOLEAN,
        status:DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};