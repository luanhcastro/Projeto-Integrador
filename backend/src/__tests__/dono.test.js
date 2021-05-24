const request = require('supertest')
const app = require('../../app')

describe('TDD de CRUD de Donos', () => {
  let UserID
  let Token

  it('Teste: Deve criar um Dono', async (done) => {
    const response = await request(app)
    .post('/dono')
    .send({
      nome: "Bianca Miazaki",
      senha: "1234",
      email: "bianca@hotmail.com",
      dataNascimento: "1999-04-15",
      cpf: "12345678960",
      endereco: "Rua 2, 222",
      telefone: "44999990006"
    })
    
    UserID = response.body.id
    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve dar erro ao criar um Dono', async (done) => {
    const response = await request(app)
    .post('/dono')
    .send({
      nome: "Vinicius Kuwakino",
      senha: "12341234",
      email: "vinicius@hotmail.com",
      dataNascimento: "1999-04-15",
      cpf: "12345678960",   // cpf ja existe
      endereco: "Rua 2, 222",
      telefone: "44999990007"
    })
    
    // console.log(response.body)

    expect(response.status).toBe(400)
    done()
  })

  it('Teste: Deve efetuar o login do Dono', async (done) => {
    const response = await request(app)
    .post('/dono/loginDono')
    .send({
      email: "bianca@hotmail.com",
      senha: "1234",
    })

    Token = response.body.token
    
    console.log(Token)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve dar erro ao efetuar o login do Dono', async (done) => {
    const response = await request(app)
    .post('/dono/loginDono')
    .send({
      email: "bianca741@hotmail.com",
      senha: "1234abcd",
    })

    expect(response.status).toBe(400)
    done()
  })
  
  it('Teste: Deve retornar todos os Donos', async (done) => {
    const response = await request(app)
      .get('/dono')

    // console.log(response.body)
    
    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve retornar os dados do Dono criado, dado o seu respectivo ID ', async (done) => {
    const response = await request(app)
      .get('/dono/' + UserID)

    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve alterar os dados deste Dono', async (done) => {
    const response = await request(app)
      .patch('/dono')
      .set('Authorization', `Bearer ${Token}`)
      .send({
        id: UserID,
        nome: "Bianca Miazaki Japanese",
        senha: "1234",
        email: "biancaMiazaki@hotmail.com",
        dataNascimento: "1999-04-15",
        endereco: "Rua 3, 321",
        telefone: "44999990006"
      })
    
    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve deletar um Dono dado o seu respectivo ID', async (done) => {
    const response = await request(app)
    .del('/dono')
    .set('Authorization', `Bearer ${Token}`)
    .send({
      idDono: UserID
    })

    // console.log(response.body)
    
    expect(response.status).toBe(200)
    done()
  })


})
