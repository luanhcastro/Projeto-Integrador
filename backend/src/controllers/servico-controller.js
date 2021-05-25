const Servico = require('../models/servico')
const Cuidador = require('../models/cuidador')
const Dono = require('../models/dono')
const Pet = require('../models/pet')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function dataFormatada() {  // funcao para formatar a data
  var data = new Date()
  var dia = data.getDate().toString().padStart(2, '0')  // aceita datas como: 01, 02, 03, assim como: 1, 2, 3
  var mes = (data.getMonth() + 1).toString().padStart(2, '0') // aceita meses como: 01, 02, 03, assim como: 1, 2, 3
  var ano = data.getFullYear()

  return ano + "-" + mes + "-" + dia
}

module.exports = {

  // Create Servico

  async postServico(req, res) {
    const {
      tipo,
      preco,
      dataInicio,
      dataFinal,
      idCuidador,
      idDono,
      idPet,
    } = req.body
    
    // Verifica se ja existe um servico com o Id de Cuidador, Dono e Pet 
    const dataServico = await Servico.findOne({
      where: {
        idDono: { [Op.eq]: idDono },
        idCuidador: { [Op.eq]: idCuidador },
        idPet: { [Op.eq]: idPet },
      }
    })  

    if (dataServico) return res.status(400).json({ error: 'Serviço está em andamento' })

    // Validacoes se existe Cuidador, Pet e Dono
    const cuidador = await Cuidador.findByPk(idCuidador)
    const dono = await Dono.findByPk(idDono)
    const pet = await Pet.findByPk(idPet)

    if (!cuidador) return res.status(400).json({ error: 'Cuidador nao existe' })
    if (!dono) return res.status(400).json({ error: 'Dono nao existe' })
    if (!pet) return res.status(400).json({ error: 'Pet nao existe' })
    
    // Verifica se o pet pertence ao dono
    const petsDono = await Pet.findOne({  
      where: {
        id: { [Op.eq]: idPet },           // id == id
        idDono: { [Op.eq]: idDono }       // idDono == idDono
      }
    })
    
    if (!petsDono) return res.status(400).send({ error: "Este Pet não pertence a este Dono" })
    
    // Verifica se a data informada e valida
    var dataAtual = dataFormatada() // formata a data atual (yyyy-mm-dd)
    const dataIni = req.body.dataInicio
    const dataFim = req.body.dataFinal

    if (dataIni < dataAtual) return res.status(400).send({ error: "Data de inicio invalida" })
    if (dataFim < dataIni) return res.status(400).send({ error: "Data de fim invalida" })


    const numeroServicos = await Cuidador.findByPk(req.body.idCuidador)

    numeroServicos.numServicos = numeroServicos.numServicos + 1 // Incrementa mais um servico 

    await numeroServicos.save() // senha criptografada foi atualizada no banco de dados

    const servico = await Servico.create({
      tipo,
      preco,
      dataInicio,
      dataFinal,
      idCuidador,
      idDono,
      idPet,
    })

    return res.json(servico)
  },

// ======================================================================================

  // Get Servicos

  async getServico(req, res) {
    const servicos = await Servico.findAll()

    return res.json(servicos)
  },

// ======================================================================================

  //Get Servicos By Id

  async getServicoById(req, res) {
    const { idServico } = req.params
    const servico = await Servico.findByPk(idServico, {
      include: [
        { association: 'cuidador', attributes: { exclude: ['senha'] }, }, // esconde a senha
        { association: 'dono', attributes: { exclude: ['senha'] }, }, 
        { association: 'pet' }
      ]
    })

    return res.json(servico)
  },

// ======================================================================================

  // Update Servico

  async updateServico(req, res) {
    const {
      idServico,
      tipo,
      preco,
      dataFinal,
    } = req.body

    const verificaServico = await Servico.findOne({
      where: {
        id: { [Op.ne]: idServico } // id != id
      }
    })

    if (verificaServico) return res.status(400).send({ error: "Id nao correspondente" })

    var dataAtual = dataFormatada() // formata a data atual (yyyy-mm-dd)

    if (dataFinal < dataAtual) return res.status(400).send({ error: "Data de fim invalida" })

    const servico = await Servico.update({
      tipo,
      preco,
      dataFinal,
    }, {
      where: {
        id: idServico
      }
    })

    if (servico) return res.json({ mensagem: "Servico Alterado Com Sucesso" })
    if (!servico) return res.json({ error: "Erro Ao Alterar Servico" })
  },

// ======================================================================================

  // Delete Servico
  
  async deleteServico(req, res) {
    const { idServico } = req.body
    const servico = await Servico.destroy({
      where: {
        id: idServico
      }
    })

    if (servico) return res.json({ mensagem: "Servico Deletado" })
    if (!servico) return res.json({ error: "Erro Ao Deletar Servico" })
  }

}