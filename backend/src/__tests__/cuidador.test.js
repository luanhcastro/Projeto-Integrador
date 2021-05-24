const request = require('supertest')
const app = require('../../app')

describe('TDD de CRUD de Cuidadores', () => {
  let UserID
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
      telefone: "44999990009"
    })
    
    UserID = response.body.id
    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve dar erro ao criar um Cuidador', async (done) => {
    const response = await request(app)
    .post('/cuidador')
    .send({
      nome: "Luan Castro",
      senha: "abc123",
      email: "vinicius@hotmail.com",
      dataNascimento: "1994-07-11",
      cpf: "12345678966",
      endereco: "Rua 6, 424",
      telefone: "44999990000"
    })
    
    // console.log(response.body)

    expect(response.status).toBe(400)
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
    
    console.log(Token)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve dar erro ao efetuar o login do Cuidador', async (done) => {
    const response = await request(app)
    .post('/cuidador/loginCuidador')
    .send({
      email: "vinicius@hotmail.com",
      senha: "abcd1234",
    })

    expect(response.status).toBe(400)
    done()
  })
  
  it('Teste: Deve retornar todos os Cuidadores', async (done) => {
    const response = await request(app)
      .get('/cuidador')

    // console.log(response.body)
    
    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve retornar os dados do Cuidador criado, dado o seu respectivo ID ', async (done) => {
    const response = await request(app)
      .get('/cuidador/' + UserID)

    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve alterar os dados deste Cuidador', async (done) => {
    const response = await request(app)
      .patch('/cuidador')
      .set('Authorization', `Bearer ${Token}`)
      .send({
        id: UserID,
        nome: "Vinicius Kuwakino",
        senha: "aabbccdd",
        email: "vinicius@hotmail.com",
        dataNascimento: "1999-05-30",
        endereco: "Rua 2, 222",
        telefone: "44999990009"
      })
    
    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve deletar um Cuidador dado o seu respectivo ID', async (done) => {
    const response = await request(app)
    .del('/cuidador')
    .set('Authorization', `Bearer ${Token}`)
    .send({
      idCuidador: UserID
    })

    // console.log(response.body)
    
    expect(response.status).toBe(200)
    done()
  })


})
