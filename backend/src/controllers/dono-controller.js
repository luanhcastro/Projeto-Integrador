const Dono = require('../models/dono')

module.exports = {

  // Create Dono
  async postDono(req, res) {
    const {
      nome,
      senha,
      dataNascimento,
      cpf,
      endereco,
      telefone,
    } = req.body

    const verificacaoCpf = await Dono.findOne({ where: { cpf: cpf } })
    const verificacaoTelefone = await Dono.findOne({ where: { telefone: telefone } })

    if (verificacaoCpf) return res.status(400).send({ error: "Cpf ja existe" })
    if (verificacaoTelefone) res.status(400).send({ error: "Telefone ja existe" })

    const dono = await Dono.create({
      nome,
      senha,
      dataNascimento,
      cpf,
      endereco,
      telefone,
    })

    return res.json(dono)
  },

  // Get Donos
  async getDono(req, res) {
    const donos = await Dono.findAll()

    return res.json(donos)
  },

  // Get Dono By Id
  async getDonoById(req, res) {
    const { idDono } = req.params
    const dono = await Dono.findByPk(idDono, {
      include: { association: 'pet' }
    })

    return res.json(dono)
  },

  // Update Dono
  async updateDono(req, res) {
    const {
      id,
      nome,
      senha,
      dataNascimento,
      endereco,
      telefone,
    } = req.body

    const dono = await Dono.update({
      nome,
      senha,
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
