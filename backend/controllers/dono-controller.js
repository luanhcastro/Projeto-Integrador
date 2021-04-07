const mysql = require('../mysql').pool

exports.postDono = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `INSERT INTO dono
            (nome, idade, cpf, endereco, qtdPets, telefone) VALUES
            (?,?,?,?,?,?)`,
            [
                req.body.nome,
                req.body.idade,
                req.body.cpf,
                req.body.endereco,
                req.body.qtdPets,
                req.body.telefone
            ],
            (error, result) => {
                connection.release()    // Libera conexao, para nao travar a api
                if (error) return res.status(500).send({error: error})

                const response = {
                    mensagem: 'Dono criado com sucesso.',
                    donoCriado: {
                        id_dono: result.id_dono,
                        nome: req.body.nome,
                        idade: req.body.idade,
                        cpf: req.body.cpf,
                        endereco: req.body.endereco,
                        qtdPets: req.body.qtdPets,
                        telefone: req.body.telefone
                    }
                }

                return res.status(201).send(response)
            }
        )
    })

}

exports.getDono = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `SELECT *
            FROM dono`,
            (error, result) => {
                if (error) return res.status(500).send({error: error})

                const response = {
                    quantidade_donos: result.length,
                    donos: result.map(dono => {
                        return {
                            id: dono.id,
                            nome: dono.nome,
                            idade: dono.idade,
                            cpf: dono.cpf,
                            endereco: dono.endereco,
                            qtdPets: dono.qtdPets,
                            telefone: dono.telefone
                        }
                    })
                }

                return res.status(201).send(response)
            }
        )
    })

}

exports.getDonoById = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `SELECT *
            FROM dono
            WHERE id = ?`,
            [req.params.id_dono],
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nao foi possivel encontrar o Dono com este ID'
                    })
                }

                const response = {
                    dono: {
                        id: result[0].id,
                        nome: result[0].nome,
                        idade: result[0].idade,
                        cpf: result[0].cpf,
                        endereco: result[0].endereco,
                        qtdPets: result[0].qtdPets,
                        telefone: result[0].telefone
                    }
                }
                
                return res.status(200).send(response)
            }
        )
    })

}

exports.updateDono = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `UPDATE dono
                SET nome = ?,
                    idade = ?,
                    cpf = ?, 
                    endereco = ?, 
                    qtdPets = ?, 
                    telefone = ?
                WHERE id = ?`,
            [
                req.body.nome,
                req.body.idade,
                req.body.cpf,
                req.body.endereco,
                req.body.qtdPets,
                req.body.telefone,
                req.body.id
            ],
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                
                const response = {
                    mensagem: 'Dados do Dono foram alterados com sucesso.',
                    donoAtualizado: {
                        id: req.id,
                        nome: req.body.nome,
                        idade: req.body.idade,
                        cpf: req.body.cpf,
                        endereco: req.body.endereco,
                        qtdPets: req.body.qtdPets,
                        telefone: req.body.telefone
                    }
                }

                return res.status(200).send(response)
            }
        )
    })

}

exports.deleteDono = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `DELETE FROM dono WHERE id = ?`,
            [req.body.id_dono],
            (error, result) => {
                connection.release()
                if (error) return res.status(500).send({error: error})

                const response = {
                    mensagem: 'Dono foi removido com sucesso.',
                }

                return res.status(202).send(response)
            }
        )
    })
}