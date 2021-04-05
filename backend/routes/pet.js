const express = require('express')
const router = express.Router()

const PetController = require('../controllers/pet-controller')

//Registra Pet
router.post('/', PetController.postPet)

//Retorna todos os Pets
router.get('/', PetController.getPet)

//Retorna todos do Pet pelo ID
router.get('/:id_pet', PetController.getPetById)

//Altera dados do Pet
router.patch('/', PetController.updatePet)

//Exclui um Pet
router.delete('/', PetController.deletePet)

module.exports = router