const mysql = require('../mysql').pool

exports.postAvaliacao = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `SELECT *
            FROM avaliacaoCuidador
            WHERE idCuidador = ?`,
            [req.body.id_cuidador],
            (error, result) => {
                if (error) return res.status(500).send({error: error})

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Id do Cuidador nao encontrado'
                    })
                }
                connection.query(
                    //Nao trata o erro do usuario, caso ele de uma avaliacao acima de 5
                    `INSERT INTO avaliacaoCuidador
                    (valor, idCuidador) VALUES
                    (?, ?)`,
                    [
                        req.body.valor,
                        req.body.id_cuidador
                    ],
                    (error, result) => {
                        connection.release()    // Libera conexao, para nao travar a api
                        if (error) return res.status(500).send({error: error})

                        const response = {
                            mensagem: 'Cuidador avaliado criado com sucesso.',
                            avaliacao: {
                                id_cuidador: req.body.id_cuidador,
                                valor: req.body.valor
                            }
                        }
                
                        return res.status(201).send(response)
                    }
                )
            }
            
        )
    })

}

exports.getAvaliacao = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `SELECT idCuidador, COUNT(idCuidador) AS count, AVG(valor) AS media
            FROM avaliacaoCuidador
            GROUP BY idCuidador`,
            (error, result) => {
                if (error) return res.status(500).send({error: error})

                const response = {
                    cuidadores_avaliados: result.length,
                    avaliacoes: result.map(avaliacao => {
                        return {
                            idCuidador: avaliacao.idCuidador,
                            num_avaliacoes: avaliacao.count,
                            media_avaliacao: avaliacao.media
                        }
                    })
                }

                return res.status(201).send(response)
            }
        )
    })

}

exports.getAvaliacaoById = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `SELECT idCuidador, COUNT(idCuidador) AS count, AVG(valor) AS media
            FROM avaliacaoCuidador
            WHERE idCuidador = ?
            GROUP BY idCuidador`,
            [req.params.id_cuidador],
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nao foi possivel encontrar o Cuidador com este ID'
                    })
                }

                const response = {
                    dono: {
                        idCuidador: result[0].idCuidador,
                        num_avaliacoes: result[0].count,
                        media_avaliacao: result[0].media
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
                    avaliacoes = ?, 
                    telefone = ?
                WHERE id = ?`,
            [
                req.body.nome,
                req.body.idade,
                req.body.cpf,
                req.body.endereco,
                req.body.qtdPets,
                req.body.avaliacoes,
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
                        avaliacoes: req.body.avaliacoes,
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