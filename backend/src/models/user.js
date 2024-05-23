'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'role_code', targetKey: 'code', as: 'roleData' })
      // User.belongsTo(models.Role, { foreignKey: 'role_code' ,as: 'roleData'})
      User.hasMany(models.Order, { foreignKey: 'userId' });
      User.belongsToMany(models.Book, { through: 'Wishlist', foreignKey: 'userId', otherKey: 'bookId' });
      User.hasMany(models.Wishlist, { foreignKey: 'userId' });
      User.hasOne(models.Cart,{ foreignKey: 'cartId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.BLOB('long'),
    // role_code: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    address: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};