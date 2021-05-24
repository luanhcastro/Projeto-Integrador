const request = require('supertest')
const app = require('../../app')

describe('TDD de CRUD de Pets', () => {
  let UserID
  let PetID_1
  let PetID_2
  let Token

  it('Teste: Deve criar um Dono', async (done) => {
    const response = await request(app)
    .post('/dono')
    .send({
      nome: "Bianca Miazaki",
      senha: "1234",
      email: "bianca@hotmail.com",
      dataNascimento: "1999-04-15",
      cpf: "12345678961",
      endereco: "Rua 2, 222",
      telefone: "44999990016"
    })
    
    UserID = response.body.id
    // console.log(response.body)

    expect(response.status).toBe(200)
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
    
    expect(response.status).toBe(200)
    done()
  })
      
  it('Teste: Deve criar um Pet_1', async (done) => {
    const response = await request(app)
    .post('/pet')
    .send({
      nomePet: "Tobias",
      raca: "ViraLata",
      porte: "pequeno",
      idade: 1,
      idDono: UserID
    })

    PetID_1 = response.body.id

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve criar um Pet_2', async (done) => {
    const response = await request(app)
    .post('/pet')
    .send({
      nomePet: "Liminha",
      raca: "Pitbull",
      porte: "medio",
      idade: 2,
      idDono: UserID
    })

    PetID_2 = response.body.id

    expect(response.status).toBe(200)
    done()
    })

  it('Teste: Deve retornar todos os Pets', async (done) => {
    const response = await request(app)
      .get('/pet')

    // console.log(response.body)
    
    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve retornar os dados do Pet_1 criado, dado o seu respectivo ID ', async (done) => {
    const response = await request(app)
      .get('/pet/' + PetID_1)

    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve alterar os dados do Pet_1', async (done) => {
    const response = await request(app)
      .patch('/pet')
      .send({
        idPet: PetID_1,
        nomePet: "Jade",
        raca: "Pug",
        porte: "pequeno",
        idade: "2"
      })
    
    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve deletar o Pet_2 dado o seu respectivo ID', async (done) => {
    const response = await request(app)
    .del('/pet')
    .send({
      idPet: PetID_2
    })

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

  it('Teste: Deve retornar vazio, pois o pet nao deve existir caso o Dono seja deletado', async (done) => {
    const response = await request(app)
      .get('/pet/' + PetID_1)

    expect(response.status).toBe(400)
    done()
  })


})
