const Dono = require('../models/dono')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {

  // Create Dono
  async postDono(req, res) {
    const {
      nome,
      senha,
      email,
      dataNascimento,
      cpf,
      endereco,
      telefone,
    } = req.body

    const verificacaoCpf = await Dono.findOne({ where: { cpf: cpf } })
    const verificacaoEmail = await Dono.findOne({ where: { email: email } })
    const verificacaoTelefone = await Dono.findOne({ where: { telefone: telefone } })

    if (verificacaoCpf) return res.status(400).send({ error: "Cpf ja existe" })
    if (verificacaoEmail) return res.status(400).send({ error: "Email ja existe" })
    if (verificacaoTelefone) return res.status(400).send({ error: "Telefone ja existe" })

    const dono = await Dono.create({
      nome,
      senha,
      email,
      dataNascimento,
      cpf,
      endereco,
      telefone,
    })

    dono.senha = undefined

    return res.json(dono)
  },

  // Get Donos
  async getDono(req, res) {
    const donos = await Dono.findAll({
      attributes: { exclude: ['senha'] }
    })

    return res.json(donos)
  },

  // Get Dono By Id
  async getDonoById(req, res) {
    const { idDono } = req.params
    const dono = await Dono.findByPk(idDono, {
      attributes: { exclude: ['senha'] }, // esconde a senha
      include: { association: 'pet' } // pets relacionados ao dono
    })

    return res.json(dono)
  },

  // Update Dono
  async updateDono(req, res) {
    const {
      id,
      nome,
      senha,
      email,
      dataNascimento,
      endereco,
      telefone,
    } = req.body

    const verificacaoEmail = await Dono.findOne({ 
      where: { 
        email: email,
        id: { [Op.ne]: id } // id != id
      }
    })
    
    const verificacaoTelefone = await Dono.findOne({ 
      where: { 
        telefone: telefone,
        id: { [Op.ne]: id } // id != id
      } 
    })

    if (verificacaoEmail) return res.status(400).send({ error: "Email ja existe" })
    if (verificacaoTelefone) return res.status(400).send({ error: "Telefone ja existe" })

    const dono = await Dono.update({
      nome,
      senha,
      email,
      dataNascimento,
      endereco,
      telefone,
    }, {
      where: {
        id: id
      }
    })

    return res.json(dono)
  },

  // Delete Dono
  async deleteDono(req, res) {
    const { idDono } = req.body
    const dono = await Dono.destroy({
      where: {
        id: idDono
      }
    })

    return res.json(dono)
  }
}
