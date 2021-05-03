const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('./src/database')

const app = express()

app.use(cors())
const RotaCuidador = require('./src/routes/cuidador')
const RotaDono = require('./src/routes/dono')
const RotaAvaliacao = require('./src/routes/avaliacao')
const RotaPet = require('./src/routes/pet')
const RotaServico = require('./src/routes/servico')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true })) // aceita apenas dados simples
app.use(express.json()) // aceita apenas dados em formato Json

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // permissao de controle de acesso para todos
    res.header( // aceitacao de cabecalho
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }

    next()
})


app.use('/cuidador', RotaCuidador)
app.use('/dono', RotaDono)
app.use('/avaliacao', RotaAvaliacao)
app.use('/pet', RotaPet)
app.use('/servico', RotaServico)


//Quando nao encontra rota
app.use((req, res, next) => {
    const erro = new Error('Nao encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app