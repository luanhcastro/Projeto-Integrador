const { Model, DataTypes } = require('sequelize')

class Pet extends Model {
  static init(sequelize) {
    super.init({
      nomePet: DataTypes.STRING,
      raca: DataTypes.STRING,
      porte: DataTypes.STRING,
      idade: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'pet'
    })
  }

  static associate(models) {
    // Cada pet pertence a um dono
    this.belongsTo(models.Dono, { foreignKey: 'idDono', as: 'dono' })
  }

}

module.exports = Pet
