'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('TransactionItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TransactionId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Transactions',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      ItemId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Items',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('TransactionItems');
  }
};