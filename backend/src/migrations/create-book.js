'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      //id, createdAt và updateAt không cần sửa, quan tâm những trường mình cần.
      id: { 
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
     
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      available: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      category_code: {
        type: Sequelize.STRING
      },
      // isChecked: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false
      // }, 
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP', 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP', 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};