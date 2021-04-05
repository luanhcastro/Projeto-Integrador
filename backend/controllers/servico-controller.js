const mysql = require('../mysql').pool

exports.postServico = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(   // Verifica se o id do Cuidador existe
            `SELECT * FROM cuidador WHERE id = ?`,
            [req.body.idCuidador],
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Id do Cuidador nao encontrado'
                    })
                }

                connection.query(   // Verifica se o id do Pet existe
                    `SELECT * FROM dono WHERE id = ?`,
                    [req.body.idDono],
                    (error, result) => {
                        if (error) return res.status(500).send({error: error})
                        if (result.length == 0) {
                            return res.status(404).send({
                                mensagem: 'Id do Dono nao encontrado'
                            })
                        }
                        connection.query(   // Verifica se o id do Dono do Pet existe
                            `SELECT * FROM pet WHERE id = ?`,
                            [req.body.idPet],
                            (error, result) => {
                                if (error) return res.status(500).send({error: error})
                                if (result.length == 0) {
                                    return res.status(404).send({
                                        mensagem: 'Id do Pet nao encontrado'
                                    })
                                }
                                connection.query(
                                    `INSERT INTO servico
                                    (tipo, preco, dataInicio, dataFinal, idCuidador, idDono, idPet) VALUES
                                    (?,?,?,?,?,?,?)`,
                                    [
                                        req.body.tipo,
                                        req.body.preco,
                                        req.body.dataInicio,
                                        req.body.dataFinal,
                                        req.body.idCuidador,
                                        req.body.idDono,
                                        req.body.idPet
                                    ],
                                    (error, result) => {
                                        connection.release()    // Libera conexao, para nao travar a api
                                        if (error) return res.status(500).send({error: error})
                        
                                        const response = {
                                            mensagem: 'Servico criado com sucesso.',
                                            servicoCriado: {
                                                id_servico: result.id_servico,
                                                tipo: req.body.tipo,
                                                preco: req.body.preco,
                                                dataInicio: req.body.dataInicio,
                                                dataFinal: req.body.dataFinal,
                                                idCuidador: req.body.idCuidador,
                                                idDono: req.body.idDono,
                                                idPet: req.body.idPet
                                            }
                                        }
                        
                                        return res.status(201).send(response)
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    })

}

exports.getServico = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `SELECT *
            FROM servico`,
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                
                const response = {
                    quantidade_servicos: result.length,
                    servicos: result.map(servico => {
                        return {
                            id: servico.id,
                            tipo: servico.tipo,
                            preco: servico.preco,
                            dataInicio: servico.dataInicio,
                            dataFinal: servico.dataFinal,
                            idCuidador: servico.idCuidador,
                            idDono: servico.idDono,
                            idPet: servico.idPet
                        }
                    })
                }

                return res.status(200).send(response)
            }
        )
    })

}

exports.getServicoById = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `SELECT *
            FROM servico
            WHERE id = ?`,
            [req.params.id_servico],
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nao foi possivel encontrar o Servico com este ID'
                    })
                }

                const response = {
                    servico: {
                        id: result[0].id,
                        tipo: result[0].tipo,
                        preco: result[0].preco,
                        dataInicio: result[0].dataInicio,
                        dataFinal: result[0].dataFinal,
                        idCuidador: result[0].idCuidador,
                        idDono: result[0].idDono,
                        idPet: result[0].idPet
                    }
                }
                
                return res.status(200).send(response)
            }
        )
    })

}

exports.updateServico = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `UPDATE servico
                SET tipo = ?,
                    preco = ?,
                    dataInicio = ?, 
                    dataFinal = ?
                WHERE id = ?`,
            [
                req.body.tipo,
                req.body.preco,
                req.body.dataInicio,
                req.body.dataFinal,
                req.body.id
            ],
            (error, result) => {
                if (error) return res.status(500).send({error: error})
                
                const response = {
                    mensagem: 'Dados do Servico foram alterados com sucesso.',
                    servicoAtualizado: {
                        id: req.id,
                        tipo: req.body.tipo,
                        preco: req.body.preco,
                        dataInicio: req.body.dataInicio,
                        dataFinal: req.body.dataFinal
                    }
                }

                return res.status(200).send(response)
            }
        )
    })

}


exports.deleteServico = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({error: error})
        connection.query(
            `DELETE FROM servico WHERE id = ?`,
            [req.body.id_servico],
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
