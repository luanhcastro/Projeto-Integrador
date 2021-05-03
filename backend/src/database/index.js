const Sequelize = require('sequelize')
const config = require('../config/database')

const Dono = require('../models/dono')
const Cuidador = require('../models/cuidador')
const Avaliacao = require('../models/avaliacao')
const Pet = require('../models/pet')
const Servico = require('../models/servico')

// Conexao com o banco de dados
const databaseConnection = new Sequelize(config)

Dono.init(databaseConnection)
Cuidador.init(databaseConnection)
Avaliacao.init(databaseConnection)
Pet.init(databaseConnection)
Servico.init(databaseConnection)

Dono.associate(databaseConnection.models)
Cuidador.associate(databaseConnection.models)
Avaliacao.associate(databaseConnection.models)
Pet.associate(databaseConnection.models)
Servico.associate(databaseConnection.models)

module.exports = databaseConnection