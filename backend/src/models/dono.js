const { Model, DataTypes } = require('sequelize')

class Dono extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      senha: DataTypes.STRING,
      dataNascimento: DataTypes.DATE,
      cpf: DataTypes.STRING,
      endereco: DataTypes.STRING,
      telefone: DataTypes.STRING
    }, {
      // Conexao com o banco de dados
      sequelize,
      tableName: 'dono'
    })
  }

  static associate(models) {
    // Donos tem muitos pets
    this.hasMany(models.Pet, { foreignKey: 'idDono', as: 'pet'})
  }
}

module.exports = Dono
