const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const CuidadorController = require('../controllers/cuidador-controller')

// Registrar cuidador
router.post('/', CuidadorController.postCuidador)

// Retorna todos os Cuidadores
router.get('/', CuidadorController.getCuidador)

// Retorna dados do Cuidador pelo ID
router.get('/:idCuidador', CuidadorController.getCuidadorById)

// Altera dados do Cuidador
router.patch('/', auth, CuidadorController.updateCuidador)

// Excluir um Cuidador
router.delete('/', auth, CuidadorController.deleteCuidador)

// Login de Cuidador
router.post ('/loginCuidador', CuidadorController.login)

module.exports = router