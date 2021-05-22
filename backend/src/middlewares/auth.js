const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

// Middleware valida se o token esta correto
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: "Token nao foi informado" })
  }

  // Formato do Token = Bearer af7ffc2a629a1c258336fde8a1f71e0a => ou, Bearer + token
  const parts = authHeader.split(' ')

  if (!parts.length === 2) {
    return res.status(401).send({ error: "Erro Token" })
  }

  const [ scheme, token ] = parts

  // Verifica se o scheme possui o comeco do Token ('Bearer')
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Error formatacao do Token" })
  }

  jwt.verify(token, authConfig.hashing, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Token Invalido" })
    }

    req.donoId = decoded.id

    return next()
  })

}