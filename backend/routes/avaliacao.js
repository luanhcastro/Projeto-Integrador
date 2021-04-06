const express = require('express')
const router = express.Router()

const AvaliacaoController = require('../controllers/avaliacao-controller')

// Registrar Avaliacao
router.post('/', AvaliacaoController.postAvaliacao)

// Retorna todas as Avaliacoes
router.get('/', AvaliacaoController.getAvaliacao)

// Retorna dados das Avaliacoes de um Cuidador pelo ID
router.get('/:id_cuidador', AvaliacaoController.getAvaliacaoById)


module.exports = router