const Cuidador = require('../models/cuidador')
const Avaliacao = require('../models/avaliacao')
const Servico = require('../models/servico')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = {

  // Create Cuidador

  async postCuidador(req, res) {
    const {
      nome,
      senha,
      email,
      dataNascimento,
      cpf,
      endereco,
      telefone,
    } = req.body

    const verificacaoCpf = await Cuidador.findOne({ where: { cpf: { [Op.eq]: cpf } } })
    const verificacaoEmail = await Cuidador.findOne({ where: { email: { [Op.eq]: email } } })
    const verificacaoTelefone = await Cuidador.findOne({ where: { telefone: { [Op.eq]: telefone } } })

    if (verificacaoCpf) return res.status(400).send({ error: "Cpf ja existe" })
    if (verificacaoEmail) return res.status(400).send({ error: "Email ja existe" })
    if (verificacaoTelefone) return res.status(400).send({ error: "Telefone ja existe" })

    const cuidador = await Cuidador.create({
      nome,
      senha,
      email,
      dataNascimento,
      cpf,
      endereco,
      telefone,
    })

    const hash = await bcrypt.hash(cuidador.senha, 10)  // criptografia HASH 

    cuidador.senha = hash // senha recebe a senha criptografada
    
    await cuidador.save() // senha criptografada foi atualizada no banco de dados

    cuidador.senha = undefined  // esconder a senha

    return res.json(cuidador)
  },

// ======================================================================================

  // Get Cuidadores

  async getCuidador(req, res) {
    const cuidadores = await Cuidador.findAll({
      attributes: { 
        exclude: ['senha'], 
      },
      include: [{
        model: Avaliacao, as: 'avaliacoes', attributes: []
      }],
    })

    return res.json(cuidadores)
  },
  
// ======================================================================================

  // Get Cuidador By Id

  async getCuidadorById(req, res) {
    const { idCuidador } = req.params

    const verificarCuidador = await Cuidador.findOne({
      where: {
        id: { [Op.eq]: idCuidador } // id == id
      }
    })

    if (!verificarCuidador) return res.status(400).send({ error: "Nao existe Cuidador com este ID" })

    const cuidador = await Cuidador.findByPk(idCuidador, {
      attributes: { 
        exclude: ['senha'], 
        include: [[Sequelize.fn('AVG', Sequelize.col('valor')), 'mediaAvaliacoes']],  // Media das avaliacoes
      },
      include: [{
        model: Avaliacao, as: 'avaliacoes', attributes: [],  // incluir tabela de avaliacoes, para fazer a media das avaliacoes
      }],
    })

    return res.json(cuidador)
  },

// ======================================================================================

  // Update Cuidador

  async updateCuidador(req, res) {
    const {
      id,
      nome,
      senha,
      email,
      dataNascimento,
      endereco,
      telefone,
    } = req.body

    const verificacaoId = await Cuidador.findOne({
      where: {
        email: { [Op.eq]: email },  // email == email
        telefone: { [Op.eq]: telefone },  // telefone == telefone
        id: { [Op.ne]: id } // id != id
      }
    })

    const verificacaoEmail = await Cuidador.findOne({ 
      where: { 
        email: { [Op.eq]: email },  // email == email
        id: { [Op.ne]: id } // id != id
      }
    })
    
    const verificacaoTelefone = await Cuidador.findOne({ 
      where: { 
        telefone: { [Op.eq]: telefone },  // telefone == telefone
        id: { [Op.ne]: id } // id != id
      } 
    })

    if (verificacaoId) return res.status(400).send({ error: "ID não corresponde a este Cuidador" })
    if (verificacaoEmail) return res.status(400).send({ error: "Email ja existe" })
    if (verificacaoTelefone) return res.status(400).send({ error: "Telefone ja existe" })
    
    const hash = await bcrypt.hash(senha, 10)  // criptografia HASH 

    const cuidador = await Cuidador.update({
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

    if (cuidador) return res.json({ mensagem: "Cuidador Alterado Com Sucesso" })
    if (!cuidador) return res.json({ error: "Erro Ao Alterar Cuidador" })
  },

// ======================================================================================

  // Delete Cuidador

  async deleteCuidador(req, res) {
    const { idCuidador } = req.body
    const cuidador = await Cuidador.destroy({
      where: {
        id: { [Op.eq]: idCuidador } // id == idCuidador
      }
    })

    if (cuidador) return res.json({ mensagem: "Cuidador Deletado" })
    if (!cuidador) return res.json({ error: "Erro Ao Deletar Cuidador" })
  },

// ======================================================================================

  // Login Cuidador

  async login(req, res) {
    const { email, senha } = req.body
    
    const cuidador = await Cuidador.findOne({
      where: {
        email: { [Op.eq]: email } // email == email
      }
    })

    if (!cuidador) {
      return res.status(400).send({ error: 'Cuidador nao encontrado' })
    }

    if (!await bcrypt.compare(senha, cuidador.senha)) {
      return res.status(400).send({ error: 'Senha invalida' })
    }

    cuidador.senha = undefined

    // authConfig -> hash para criacao das senhas 
    const token = jwt.sign({ id: cuidador.id }, authConfig.hashing, {
      expiresIn: 7200,  // parametro que passa o tempo que o token ira expirar, no caso 1 hora = 7200 segundos
    })
    
    return res.json({ cuidador, token })
  }
}

