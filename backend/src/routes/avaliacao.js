const express = require('express')
const router = express.Router()

const AvaliacaoController = require('../controllers/avaliacao-controller')

// Registrar Avaliacao
router.post('/', AvaliacaoController.postAvaliacao)

// Retorna todas as Avaliacoes
router.get('/', AvaliacaoController.getAvaliacao)

// Retorna Avaliacoes de um Cuidador
router.get('/:idCuidador', AvaliacaoController.getAvaliacaoByDonoId)

module.exports = router