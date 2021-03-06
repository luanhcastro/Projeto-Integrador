const Dono = require('../models/dono')
const Pet = require('../models/pet')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {

  // Create Pet

  async postPet(req, res) {
    const {
      nomePet,
      raca,
      porte,
      idade,
      idDono,
    } = req.body

    const dono = await Dono.findByPk(idDono)

    if (!dono) return res.status(400).json({ error: 'Dono nao existe' })

    const pet = await Pet.create({
      nomePet,
      raca,
      porte,
      idade,
      idDono,
    })

    return res.json(pet)
  },

// ======================================================================================

  // Get Pets

  async getPet(req, res) {
    const pets = await Pet.findAll()

    return res.json(pets)
  },

// ======================================================================================

  // Get Pet By Id

  async getPetById(req, res) {
    const { idPet } = req.params
    const pet = await Pet.findByPk(idPet, {
      include: [ 
        {association: 'dono', attributes: { exclude: ['senha'] }} // esconde a senha     
      ]
      
    })

    if (!pet) return res.status(400).send({ error: "Nao existe Pet com este ID" })

    return res.json(pet)
  },

// ======================================================================================

  // Update Pet

  async updatePet(req, res) {
    const {
      idPet,
      nomePet,
      raca,
      porte,
      idade,
    } = req.body

    const pet = await Pet.update({
      nomePet,
      raca,
      porte,
      idade,
    }, {
      where: {
        id: { [Op.eq]: idPet }
      }
    })

    if (pet) return res.json({ mensagem: "Pet Alterado Com Sucesso" })
    if (!pet) return res.json({ error: "Erro Ao Alterar Pet" })
  },

// ======================================================================================

  // Delete Pet
  
  async deletePet(req, res) {
    const { idPet } = req.body
    const pet = await Pet.destroy({
      where: {
        id: { [Op.eq]: idPet }
      }
    })

    if (pet) return res.json({ mensagem: "Pet Deletado" })
    if (!pet) return res.json({ error: "Erro Ao Deletar Pet" })
  }

}