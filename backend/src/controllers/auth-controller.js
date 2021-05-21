module.exports = {
  async getAuth(req, res) {
    res.send({ mensagem: "Autenticado" })
  }
}