const { Model, DataTypes } = require('sequelize')

class Avaliacao extends Model {
  static init(sequelize) {
    super.init({
      valor: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'avaliacaoCuidador'
    })
  }

  static associate(models) {
    // Avaliacao pertence a um cuidador
    this.belongsTo(models.Cuidador, { foreignKey: 'idCuidador' , as: 'cuidador'})
  }

}

module.exports = Avaliacao