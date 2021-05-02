const express = require('express')
const router = express.Router()

const DonoController = require('../controllers/dono-controller')

// Registrar Donos
router.post('/', DonoController.postDono)

// Retorna todos os Donos
router.get('/', DonoController.getDono)

// Retorna dados do Dono pelo ID
router.get('/:idDono', DonoController.getDonoById)

// Altera dados do Dono
router.patch('/', DonoController.updateDono)

// Excluir um Dono
router.delete('/', DonoController.deleteDono)

module.exports = router