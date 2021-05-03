const { Model, DataTypes } = require('sequelize')

class Servico extends Model {
  static init(sequelize) {
    super.init({
      tipo: DataTypes.STRING,
      preco: DataTypes.DECIMAL,
      dataInicio: DataTypes.DATE,
      dataFinal: DataTypes.DATE,
    }, {
      sequelize,
      tableName: 'servico'
    })
  }

  static associate(models) {
    // Cada servico possui um Dono
    this.belongsTo(models.Dono, { foreignKey: 'idDono', as: 'dono' })

    // Cada servico possui um Cuidador
    this.belongsTo(models.Cuidador, { foreignKey: 'idCuidador', as: 'cuidador' })

    // Cada servico possui um ou mais Pets
    this.belongsTo(models.Pet, { foreignKey: 'idPet', as: 'pet' })
  }

}

module.exports = Servico
