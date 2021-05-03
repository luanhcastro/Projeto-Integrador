const express = require('express')
const router = express.Router()

const CuidadorController = require('../controllers/cuidador-controller')

// Registrar cuidador
router.post('/', CuidadorController.postCuidador)

// Retorna todos os Cuidadores
router.get('/', CuidadorController.getCuidador)

// Retorna dados do Cuidador pelo ID
router.get('/:idCuidador', CuidadorController.getCuidadorById)

// Altera dados do Cuidador
router.patch('/', CuidadorController.updateCuidador)

// Excluir um Cuidador
router.delete('/', CuidadorController.deleteCuidador)

module.exports = router