const { Model, DataTypes } = require('sequelize')

class Cuidador extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      dataNascimento: DataTypes.DATE,
      cpf: DataTypes.STRING,
      endereco: DataTypes.STRING,
      numServicos: DataTypes.INTEGER,
      telefone: DataTypes.STRING
    }, {
      // Conexao com o banco de dados
      sequelize,
      tableName: 'cuidador'
    })
  }

  static associate(models) {
    // Cuidador tem muitas avaliacoes
    this.hasMany(models.Avaliacao, { foreignKey: 'idCuidador', as: 'avaliacoes' })
  }
}

module.exports = Cuidador