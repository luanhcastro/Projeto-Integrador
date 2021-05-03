const Servico = require('../models/servico')
const Cuidador = require('../models/cuidador')
const Dono = require('../models/dono')
const Pet = require('../models/pet')

module.exports = {

  // Create Servico
  async postServico(req, res) {
    const {
      tipo,
      preco,
      dataInicio,
      dataFinal,
      idCuidador,
      idDono,
      idPet,
    } = req.body

    const cuidador = await Cuidador.findByPk(idCuidador)
    const dono = await Dono.findByPk(idDono)
    const pet = await Pet.findByPk(idPet)

    if (!cuidador) return res.status(400).json({ error: 'Cuidador nao existe' })
    if (!dono) return res.status(400).json({ error: 'Dono nao existe' })
    if (!pet) return res.status(400).json({ error: 'Pet nao existe' })

    const servico = await Servico.create({
      tipo,
      preco,
      dataInicio,
      dataFinal,
      idCuidador,
      idDono,
      idPet,
    })

    return res.json(servico)
  },

  // Get Servicos
  async getServico(req, res) {
    const servicos = await Servico.findAll()

    return res.json(servicos)
  },

  //Get Servicos By Id
  async getServicoById(req, res) {
    const { idServico } = req.params
    const servico = await Servico.findByPk(idServico, {
      include: [
        { association: 'cuidador' },
        { association: 'dono' },
        { association: 'pet' }
      ]
    })

    return res.json(servico)
  },

  // Update Servico
  async updateServico(req, res) {
    const {
      idServico,
      tipo,
      preco,
      dataInicio,
      dataFinal,
    } = req.body

    const servico = await Servico.update({
      tipo,
      preco,
      dataInicio,
      dataFinal,
    }, {
      where: {
        id: idServico
      }
    })

    return res.json(servico)
  },

  // Delete Servico
  async deleteServico(req, res) {
    const { idServico } = req.body
    const servico = await Servico.destroy({
      where: {
        id: idServico
      }
    })

    return res.json(servico)
  }

}