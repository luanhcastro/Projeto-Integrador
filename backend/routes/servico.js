const express = require('express')
const router = express.Router()

const ServicoController = require('../controllers/servico-controller')

// Registrar cuidador
router.post('/', ServicoController.postServico)

// Retorna todos os Cuidadores
router.get('/', ServicoController.getServico)

// Retorna dados do Cuidador pelo ID
router.get('/:id_servico', ServicoController.getServicoById)

// Altera dados do Cuidador
router.patch('/', ServicoController.updateServico)

// Excluir um Cuidador
router.delete('/', ServicoController.deleteServico)

module.exports = router