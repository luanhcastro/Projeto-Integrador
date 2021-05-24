const request = require('supertest')
const app = require('../../app')

function dataFormatada() {  // funcao para formatar a data
  var data = new Date()
  var dia = data.getDate().toString().padStart(2, '0')  // aceita datas como: 01, 02, 03, assim como: 1, 2, 3
  var mes = (data.getMonth() + 1).toString().padStart(2, '0') // aceita meses como: 01, 02, 03, assim como: 1, 2, 3
  var ano = data.getFullYear()

  return ano + "-" + mes + "-" + dia
}

function dataFormatadaAdiantada() {  // funcao para formatar a data futura
  var data = new Date()
  var dia = (data.getDate() + 1).toString().padStart(2, '0')  // aceita datas como: 01, 02, 03, assim como: 1, 2, 3
  var mes = (data.getMonth() + 1).toString().padStart(2, '0') // aceita meses como: 01, 02, 03, assim como: 1, 2, 3
  var ano = data.getFullYear()

  return ano + "-" + mes + "-" + dia
}

describe('TDD de CRUD de Serviços', () => {
  let DonoID
  let ServicoID
  let CuidadorID
  let PetID
  let TokenDono
  let TokenCuidador
  let dataAtual = dataFormatada()
  let dataFutura = dataFormatadaAdiantada()

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
    
    DonoID = response.body.id
    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve criar um Pet', async (done) => {
    const response = await request(app)
    .post('/pet')
    .send({
      nomePet: "Tobias",
      raca: "ViraLata",
      porte: "pequeno",
      idade: 1,
      idDono: DonoID
    })

    PetID = response.body.id

    expect(response.status).toBe(200)
    done()
  })

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

  it('Teste: Deve efetuar o login do Dono', async (done) => {
    const response = await request(app)
    .post('/dono/loginDono')
    .send({
      email: "bianca@hotmail.com",
      senha: "1234",
    })

    TokenDono = response.body.token
    
    // console.log(Token)

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

    TokenCuidador = response.body.token
    
    // console.log(Token)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve criar um Servico', async (done) => {
    const response = await request(app)
    .post('/servico')
    .send({
      tipo: "Levar ao veterinario",
      preco: 47,
      dataInicio: dataAtual,
      dataFinal: dataFutura,
      idCuidador: CuidadorID,
      idDono: DonoID,
      idPet: PetID,
    })
    
    ServicoID = response.body.id
    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve dar erro criar um Servico', async (done) => {
    const response = await request(app)
    .post('/servico')
    .send({
      tipo: "Levar ao veterinario",
      preco: 47,
      dataInicio: "2020-09-15",
      dataFinal: "2020-09-20",
      idCuidador: CuidadorID,
      idDono: DonoID,
      idPet: PetID,
    })
    
    expect(response.status).toBe(400)
    done()
  })

  it('Teste: Deve retornar todos os Serviços', async (done) => {
    const response = await request(app)
      .get('/servico')

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve retornar os dados do Serviço criado, dado o seu respectivo ID ', async (done) => {
    const response = await request(app)
      .get('/servico/' + ServicoID)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve alterar os dados deste Serviço', async (done) => {
    const response = await request(app)
      .patch('/servico')
      .send({
        idServico: ServicoID,
        tipo: "Passear com o pet",
        preco: 47,
        dataInicio: "2020-09-15",
        dataFinal: "2020-09-20",
      })
    
    // console.log(response.body)

    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve deletar um Serviço dado o seu respectivo ID', async (done) => {
    const response = await request(app)
    .del('/servico')
    .send({
      idServico: ServicoID
    })

    // console.log(response.body)
    
    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve deletar um Dono dado o seu respectivo ID', async (done) => {
    const response = await request(app)
    .del('/dono')
    .set('Authorization', `Bearer ${TokenDono}`)
    .send({
      idDono: DonoID
    })

    // console.log(response.body)
    
    expect(response.status).toBe(200)
    done()
  })

  it('Teste: Deve deletar um Cuidador dado o seu respectivo ID', async (done) => {
    const response = await request(app)
    .del('/cuidador')
    .set('Authorization', `Bearer ${TokenCuidador}`)
    .send({
      idCuidador: CuidadorID
    })

    // console.log(response.body)
    
    expect(response.status).toBe(200)
    done()
  })


})
