const Cuidador = require('../models/cuidador')

module.exports = {

  // Create Cuidador
  async postCuidador(req, res) {
    const {
      nome,
      senha,
      dataNascimento,
      cpf,
      endereco,
      numServicos,
      telefone,
    } = req.body

    const verificacaoCpf = await Cuidador.findOne({ where: { cpf: cpf } })
    const verificacaoTelefone = await Cuidador.findOne({ where: { telefone: telefone } })

    if (verificacaoCpf) return res.status(400).send({ error: "Cpf ja existe" })
    if (verificacaoTelefone) res.status(400).send({ error: "Telefone ja existe" })

    const cuidador = await Cuidador.create({
      nome,
      senha,
      dataNascimento,
      cpf,
      endereco,
      numServicos,
      telefone,
    })

    return res.json(cuidador)
  },

  // Get Cuidadores
  async getCuidador(req, res) {
    const cuidadores = await Cuidador.findAll()

    return res.json(cuidadores)
  },

  // Get Cuidador By Id
  async getCuidadorById(req, res) {
    const { idCuidador } = req.params
    const cuidador = await Cuidador.findByPk(idCuidador, {
      include: { association: 'avaliacoes' }
    })

    return res.json(cuidador)
  },

  // Update Cuidador
  async updateCuidador(req, res) {
    const {
      id,
      nome,
      senha,
      dataNascimento,
      endereco,
      numServicos,
      telefone,
    } = req.body

    const cuidador = await Cuidador.update({
      nome,
      senha,
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

