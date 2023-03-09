'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('ItemDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('ItemDetails');
  }
};