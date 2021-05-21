const express = require('express')
const router = express.Router()

const AuthMiddleware = require('../middlewares/auth')
const AuthController = require('../controllers/auth-controller')

// Autenticacao 
router.use(AuthMiddleware)
router.get('/', AuthController.getAuth)

module.exports = router