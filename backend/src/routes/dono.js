const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const DonoController = require('../controllers/dono-controller')

// Registrar Donos
router.post('/', DonoController.postDono)

// Retorna todos os Donos
router.get('/', DonoController.getDono)

// Retorna dados do Dono pelo ID
router.get('/:idDono', DonoController.getDonoById)

// Altera dados do Dono
router.patch('/', auth, DonoController.updateDono)

// Excluir um Dono
router.delete('/', auth, DonoController.deleteDono)

// Login de Dono
router.post ('/loginDono', DonoController.login)

module.exports = router