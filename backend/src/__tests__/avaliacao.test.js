const request = require('supertest')
const app = require('../../app')

describe('TDD de Avaliacoes', () => {
  let CuidadorID
  let Token

  it('Teste: Deve criar um Cuidador', async (done) => {
    const response = await request(app)
    .post('/cuidador')
    .send({
      nome: "Vinicius Kuwakino",
      senha: "a1b2c3d4",
      email: "vinicius@hotmail.com",
      dataNascimento: "1999-05-30",
      cpf: "12345678965",
      endereco: "Rua 2, 222",
      numServicos: 2,
      telefone: "44999990009"
    })
    
    CuidadorID = response.body.id
    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve efetuar o login do Cuidador', async (done) => {
    const response = await request(app)
    .post('/cuidador/loginCuidador')
    .send({
      email: "vinicius@hotmail.com",
      senha: "a1b2c3d4",
    })

    Token = response.body.token
    
    // console.log(Token)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve criar uma Avaliacao', async (done) => {
    const response = await request(app)
    .post('/avaliacao')
    .send({
      valor: 5,
      idCuidador: CuidadorID,
    })
    
    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve dar erro ao criar uma Avaliacao', async (done) => {
    const response = await request(app)
    .post('/avaliacao')
    .send({
      valor: 6,
      idCuidador: CuidadorID,
    })
    
    expect(response.status).toBe(400)
    done()
  })

  it('Teste: Deve retornar todos as Avaliacoes', async (done) => {
    const response = await request(app)
      .get('/avaliacao')

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve retornar as avaliacoes do Dono, dado o seu respectivo ID ', async (done) => {
    const response = await request(app)
      .get('/avaliacao/' + CuidadorID)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve deletar um Dono dado o seu respectivo ID', async (done) => {
    const response = await request(app)
    .del('/dono')
    .set('Authorization', `Bearer ${Token}`)
    .send({
      idCuidador: CuidadorID
    })

    // console.log(response.body)
    
    expect(response.status).toBe(200)
    done()
  })


})
