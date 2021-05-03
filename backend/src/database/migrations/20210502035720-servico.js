'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('servico', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      dataInicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataFinal: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      idCuidador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: 'cuidador', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idDono: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        references: { model: 'dono', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idPet: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        references: { model: 'pet', key: 'id' },
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
    return queryInterface.dropTable('servico')
  }
};
