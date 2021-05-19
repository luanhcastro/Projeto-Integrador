const request = require('supertest')
const app = require('../../app')


describe('TDD de CRUD de Donos', () => {
  let UserID
  it('Teste: Deve criar um Dono', async (done) => {
    const response = await request(app)
    .post('/dono')
    .send({
      nome: "Vinicius Kuwakino",
      senha: "1234",
      email: "vinicius@hotmail.com",
      dataNascimento: "1999-05-30",
      cpf: "12345678960",
      endereco: "Rua 2, 222",
      telefone: 44999990006
    })
    
    UserID = response.body.id
    expect(response.status).toBe(200)
    done()
  })
  
  it('Teste: Deve retornar todos os Donos', async (done) => {
    const response = await request(app)
      .get('/dono')

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve retornar os dados do Dono criado, dado o seu respectivo ID ', async (done) => {
    const response = await request(app)
      .get('/dono/' + UserID)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve alterar os dados de um Dono', async (done) => {
    const response = await request(app)
      .patch('/dono')
      .send({
        id: UserID,
        email: "vinicius@hotmail.com",
        nome: "Vinicius Japones Kuwakino",
        dataNascimento: "1999-05-30",
        cpf: "12345678960",
        endereco: "Rua 1, 111",
        telefone: 44999990006
      })
      
    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve deletar um Dono dado o seu respectivo ID', async (done) => {
    const response = await request(app)
      .del('/dono')
      .send({
        idDono: UserID
      })

    expect(response.status).toBe(200)
    done()
  })


})
