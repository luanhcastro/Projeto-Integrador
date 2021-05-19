const Cuidador = require('../models/cuidador')
const Avaliacao = require('../models/avaliacao')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Fn = Sequelize.fn

module.exports = {

  // Create Cuidador
  async postCuidador(req, res) {
    const {
      nome,
      senha,
      email,
      dataNascimento,
      cpf,
      endereco,
      numServicos,
      telefone,
    } = req.body

    const verificacaoCpf = await Cuidador.findOne({ where: { cpf: cpf } })
    const verificacaoEmail = await Cuidador.findOne({ where: { email: email } })
    const verificacaoTelefone = await Cuidador.findOne({ where: { telefone: telefone } })

    if (verificacaoCpf) return res.status(400).send({ error: "Cpf ja existe" })
    if (verificacaoEmail) return res.status(400).send({ error: "Email ja existe" })
    if (verificacaoTelefone) return res.status(400).send({ error: "Telefone ja existe" })

    const cuidador = await Cuidador.create({
      nome,
      senha,
      email,
      dataNascimento,
      cpf,
      endereco,
      numServicos,  // de acordo com o numero de avaliacoes
      telefone,
    })

    cuidador.senha = undefined

    return res.json(cuidador)
  },

  // Get Cuidadores
  async getCuidador(req, res) {
    const cuidadores = await Cuidador.findAll({
      attributes: { 
        exclude: ['senha'], 
        include: [[Sequelize.fn('AVG', Sequelize.col('valor')), 'mediaAvaliacoes']]
      },
      include: [{
        model: Avaliacao, as: 'avaliacoes', attributes: []
      }],
    })

    return res.json(cuidadores)
  },

  // Get Cuidador By Id
  async getCuidadorById(req, res) {
    const { idCuidador } = req.params
    const cuidador = await Cuidador.findByPk(idCuidador, {
      attributes: { 
        exclude: ['senha'], 
        include: [[Sequelize.fn('AVG', Sequelize.col('valor')), 'mediaAvaliacoes']] // Media das avaliacoes
      },
      include: [{
        model: Avaliacao, as: 'avaliacoes', attributes: []  // incluir tabela de avaliacoes, para fazer a media das avaliacoes
      }],
    })

    return res.json(cuidador)
  },

  // Update Cuidador
  async updateCuidador(req, res) {
    const {
      id,
      nome,
      senha,
      email,
      dataNascimento,
      endereco,
      numServicos,
      telefone,
    } = req.body

    const verificacaoEmail = await Cuidador.findOne({ 
      where: { 
        email: email,
        id: { [Op.ne]: id } // id != id
      }
    })
    
    const verificacaoTelefone = await Cuidador.findOne({ 
      where: { 
        telefone: telefone,
        id: { [Op.ne]: id } // id != id
      } 
    })

    if (verificacaoEmail) return res.status(400).send({ error: "Email ja existe" })
    if (verificacaoTelefone) return res.status(400).send({ error: "Telefone ja existe" })

    const cuidador = await Cuidador.update({
      nome,
      senha,
      email,
      dataNascimento,
      endereco,
      numServicos,
      telefone,
    }, {
      where: {
        id: id
      }
    })
    
    return res.json(cuidador)
  },

  // Delete Cuidador
  async deleteCuidador(req, res) {
    const { idCuidador } = req.body
    const cuidador = await Cuidador.destroy({
      where: {
        id: idCuidador
      }
    })

    return res.json(cuidador)
  }
}

