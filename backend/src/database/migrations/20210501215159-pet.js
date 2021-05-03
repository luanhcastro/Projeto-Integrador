'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('pet', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nomePet: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      raca: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      porte: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      idDono: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { model: 'dono', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pet')
  }
};
