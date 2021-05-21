const Dono = require('../models/dono')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = {

  // Create Dono

  async postDono(req, res) {
    const {
      nome,
      senha,
      email,
      dataNascimento,
      cpf,
      endereco,
      telefone,
    } = req.body

    const verificacaoCpf = await Dono.findOne({ where: { cpf: cpf } })
    const verificacaoEmail = await Dono.findOne({ where: { email: email } })
    const verificacaoTelefone = await Dono.findOne({ where: { telefone: telefone } })

    if (verificacaoCpf) return res.status(400).send({ error: "Cpf ja existe" })
    if (verificacaoEmail) return res.status(400).send({ error: "Email ja existe" })
    if (verificacaoTelefone) return res.status(400).send({ error: "Telefone ja existe" })

    const dono = await Dono.create({
      nome,
      senha,
      email,
      dataNascimento,
      cpf,
      endereco,
      telefone,
    })
    
    const hash = await bcrypt.hash(dono.senha, 10)  // criptografia HASH 

    dono.senha = hash // senha recebe a senha criptografada
    
    await dono.save() // senha criptografada foi atualizada no banco de dados

    dono.senha = undefined  // esconder a senha

    return res.json(dono)
  },

// ======================================================================================

  // Get Donos

  async getDono(req, res) {
    const donos = await Dono.findAll({
      attributes: { exclude: ['senha'] }
    })

    return res.json(donos)
  },

// ======================================================================================

  // Get Dono By Id

  async getDonoById(req, res) {
    const { idDono } = req.params
    const dono = await Dono.findByPk(idDono, {
      attributes: { exclude: ['senha'] }, // esconde a senha
      include: { association: 'pet' } // pets relacionados ao dono
    })

    return res.json(dono)
  },

// ======================================================================================

  // Update Dono

  async updateDono(req, res) {
    const {
      id,
      nome,
      senha,
      email,
      dataNascimento,
      endereco,
      telefone,
    } = req.body

    const verificacaoId = await Dono.findOne({
      where: {
        email: { [Op.eq]: email },  // email == email
        telefone: { [Op.eq]: telefone },  // telefone == telefone
        id: { [Op.ne]: id } // id != id
      }
    })

    const verificacaoEmail = await Dono.findOne({ 
      where: { 
        email: { [Op.eq]: email },  // email == email
        id: { [Op.ne]: id } // id != id
      }
    })
    
    const verificacaoTelefone = await Dono.findOne({ 
      where: { 
        telefone: { [Op.eq]: telefone },  // telefone == telefone
        id: { [Op.ne]: id } // id != id
      } 
    })

    if (verificacaoId) return res.status(400).send({ error: "ID não corresponde a este Dono" })
    if (verificacaoEmail) return res.status(400).send({ error: "Email ja existe" })
    if (verificacaoTelefone) return res.status(400).send({ error: "Telefone ja existe" })

    const hash = await bcrypt.hash(senha, 10)  // criptografia HASH 

    const dono = await Dono.update({
      nome,
      senha: hash,
      email,
      dataNascimento,
      endereco,
      telefone,
    }, {
      where: {
        id: { [Op.eq]: id } // id == id
      }
    })

    if (dono) return res.json({ mensagem: "Dono Alterado Com Sucesso" })
    if (!dono) return res.json({ error: "Erro Ao Alterar Dono" })
  },

// ======================================================================================

  // Delete Dono

  async deleteDono(req, res) {
    const { idDono } = req.body
    const dono = await Dono.destroy({
      where: {
        id: idDono
      }
    })

    if (dono) return res.json({ mensagem: "Dono Deletado" })
    if (!dono) return res.json({ error: "Erro Ao Deletar Dono" })
  },

// ======================================================================================

  // Login Dono

  async login(req, res) {
    const { email, senha } = req.body

    const dono = await Dono.findOne({
      where: {
        email: email
      }
    })

    if (!dono) {
      return res.status(400).send({ error: 'Dono nao encontrado' })
    }

    if (!await bcrypt.compare(senha, dono.senha)) {
      return res.status(400).send({ error: 'Senha invalida' })
    }

    dono.senha = undefined

    // authConfig -> hash para criacao das senhas 
    const token = jwt.sign({ id: dono.id }, authConfig.hashing, {
      expiresIn: 7200,  // parametro que passa o tempo que o token ira expirar, no caso 1 hora = 7200 segundos
    })
    
    return res.json({ dono, token })
  }
}
