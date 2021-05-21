const Servico = require('../models/servico')
const Cuidador = require('../models/cuidador')
const Dono = require('../models/dono')
const Pet = require('../models/pet')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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

// ======================================================================================

  // Get Servicos

  async getServico(req, res) {
    const servicos = await Servico.findAll()

    return res.json(servicos)
  },

// ======================================================================================

  //Get Servicos By Id

  async getServicoById(req, res) {
    const { idServico } = req.params
    const servico = await Servico.findByPk(idServico, {
      include: [
        { association: 'cuidador', attributes: { exclude: ['senha'] }, }, // esconde a senha
        { association: 'dono', attributes: { exclude: ['senha'] }, }, 
        { association: 'pet' }
      ]
    })

    return res.json(servico)
  },

// ======================================================================================

  // Update Servico

  async updateServico(req, res) {
    const {
      idServico,
      tipo,
      preco,
      dataInicio,
      dataFinal,
    } = req.body

    const verificaServico = await Servico.findOne({
      where: {
        id: { [Op.ne]: idServico } // id != id
      }
    })

    if (verificaServico) return res.status(400).send({ error: "Id nao correspondente" })

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

    if (servico) return res.json({ mensagem: "Servico Alterado Com Sucesso" })
    if (!servico) return res.json({ error: "Erro Ao Alterar Servico" })
  },

// ======================================================================================

  // Delete Servico
  
  async deleteServico(req, res) {
    const { idServico } = req.body
    const servico = await Servico.destroy({
      where: {
        id: idServico
      }
    })

    if (servico) return res.json({ mensagem: "Servico Deletado" })
    if (!servico) return res.json({ error: "Erro Ao Deletar Servico" })
  }

}