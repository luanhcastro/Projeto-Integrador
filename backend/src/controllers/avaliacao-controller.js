const Cuidador = require('../models/cuidador')
const Avaliacao = require('../models/avaliacao')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {

  // Create Avaliacao
  
  async postAvaliacao(req, res) {
    const { 
      valor,
      idCuidador,
    } = req.body

    const cuidador = await Cuidador.findByPk(idCuidador)

    if (!cuidador) return res.status(400).json({ error: 'Cuidador nao existe' })
    if (valor < 0 || valor > 5) return res.status(400).json({ error: 'Valor invalido' })

    const avaliacao = await Avaliacao.create({
      valor,
      idCuidador
    })

    return res.json(avaliacao)
  },

// ======================================================================================

  // Get Avaliacoes

  async getAvaliacao(req, res){
    const avaliacoes = await Avaliacao.findAll()

    return res.json(avaliacoes)
  },

// ======================================================================================

  // Get Avaliacoes de cada Cuidador

  async getAvaliacaoByDonoId(req, res) {
    const { idCuidador } = req.params

    const verificacaoId = await Cuidador.findOne({
      where: {
        id: { [Op.eq]: idCuidador } // id == id
      }
    })
    
    if (!verificacaoId) return res.status(400).json({ error: 'Cuidador nao existe' })

    const cuidador = await Cuidador.findByPk(idCuidador, {
      // Inclusao de associacao ou um relacionamento
      include: { association: 'avaliacoes' },
      attributes: {
        exclude: ['senha'] // esconde a senha
      }
    }) 

    return res.json(cuidador)
  }
}