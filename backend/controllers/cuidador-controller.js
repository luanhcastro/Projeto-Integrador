const mysql = require('../mysql').pool

exports.postCuidador = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `INSERT INTO cuidador
            (nome, idade, cpf, endereco, numServicos, telefone) VALUES
            (?,?,?,?,?,?)`,
            [
                req.body.nome,
                req.body.idade,
                req.body.cpf,
                req.body.endereco,
                req.body.numServicos,
                req.body.telefone
            ],
            (error, result) => {
                connection.release()    // Libera conexao, para nao travar a api
                if (error) return res.status(500).send({error: error})

                const response = {
                    mensagem: 'Cuidador criado com sucesso.',
                    cuidadorCriado: {
                        id_cuidador: result.id_cuidador,
                        nome: req.body.nome,
                        idade: req.body.idade,
                        cpf: req.body.cpf,
                        endereco: req.body.endereco,
                        numServicos: req.body.numServicos,
                        telefone: req.body.telefone
                    }
                }

                return res.status(201).send(response)
            }
        )
    })

}

exports.getCuidador = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `SELECT *
            FROM cuidador`,
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                
                const response = {
                    quantidade_cuidadores: result.length,
                    cuidadores: result.map(cuidador => {
                        return {
                            id: cuidador.id,
                            nome: cuidador.nome,
                            idade: cuidador.idade,
                            cpf: cuidador.cpf,
                            endereco: cuidador.endereco,
                            numServicos: cuidador.numServicos,
                            telefone: cuidador.telefone
                        }
                    })
                }

                return res.status(200).send(response)
            }
        )
    })

}

exports.getCuidadorById = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `SELECT *
            FROM cuidador
            WHERE id = ?`,
            [req.params.id_cuidador],
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nao foi possivel encontrar o Cuidador com este ID'
                    })
                }

                const response = {
                    cuidadores: {
                        id: result[0].id,
                        nome: result[0].nome,
                        idade: result[0].idade,
                        cpf: result[0].cpf,
                        endereco: result[0].endereco,
                        numServicos: result[0].numServicos,
                        telefone: result[0].telefone
                    }
                }
                
                return res.status(200).send(response)
            }
        )
    })

}

exports.updateCuidador = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `UPDATE cuidador
                SET nome = ?,
                    idade = ?,
                    cpf = ?, 
                    endereco = ?, 
                    numServicos = ?, 
                    telefone = ?
                WHERE id = ?`,
            [
                req.body.nome,
                req.body.idade,
                req.body.cpf,
                req.body.endereco,
                req.body.numServicos,
                req.body.telefone,
                req.body.id
            ],
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                
                const response = {
                    mensagem: 'Dados do cuidador foram alterados com sucesso.',
                    cuidadorAtualizado: {
                        id: req.id,
                        nome: req.body.nome,
                        idade: req.body.idade,
                        cpf: req.body.cpf,
                        endereco: req.body.endereco,
                        numServicos: req.body.numServicos,
                        telefone: req.body.telefone
                    }
                }

                return res.status(200).send(response)
            }
        )
    })

}

exports.deleteCuidador = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `DELETE FROM cuidador WHERE id = ?`,
            [req.body.id_cuidador],
            (error, result) => {
                connection.release()
                if (error) return res.status(500).send({error: error})

                const response = {
                    mensagem: 'Cuidador foi removido com sucesso.',
                }

                return res.status(202).send(response)
            }
        )
    })
}
