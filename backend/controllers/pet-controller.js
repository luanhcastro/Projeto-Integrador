const mysql = require('../mysql').pool

exports.postPet = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({ error: error })
        connection.query(
            `INSERT INTO pet
            (nomePet, raca, porte, idade) VALUES
            (?, ?, ?, ?)`, [
                req.body.nome,
                req.body.raca,
                req.body.porte,
                req.body.idade
            ],
            (error, result) => {
                connection.release()
                if (error) return res.status(500).send({ error: error })

                // const idDono = donoCriado.id_dono,
                const response = {
                    mensagem: 'Cadastro do Pet realizado com sucesso!',
                    petCriado: {
                        id: result.id,
                        nome: req.body.nome,
                        raca: req.body.raca,
                        porte: req.body.porte,
                        idade: req.body.idade
                            //id_dono: idDono
                    }
                }
                return res.status(201).send(response)
            }
        )
    })
}

exports.getPet = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({ error: error })
        connection.query(
            `SELECT *
            FROM pet`,
            (error, result) => {
                if (error) return res.status(500).send({ error: error })

                const response = {
                    quantidade_pets: result.length,
                    pets: result.map(pet => {
                        return {
                            id: pet.id,
                            nome: pet.nomePet,
                            raca: pet.raca,
                            porte: pet.porte,
                            idade: pet.idade,
                            id_dono: pet.id_dono
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
}

exports.getPetById = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({ error: error })
        connection.query(
            `SELECT *
            FROM pet
            WHERE id = ?`, [req.params.id_pet],
            (error, result) => {
                if (error) return res.status(500).send({ error: error })

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi possível encontrar o Pet com este ID'
                    })
                }

                const response = {
                    pets: {
                        id: result[0].id,
                        nome: result[0].nomePet,
                        raca: result[0].raca,
                        porte: result[0].porte,
                        idade: result[0].idade
                            //id_dono:
                    }
                }
                return res.status(200).send(response)
            }
        )
    })
}

exports.updatePet = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({ error: error })
        connection.query(
            `UPDATE pet
             SET nomePet = ?,
                 raca = ?,
                 porte = ?,
                 idade = ?
            WHERE id = ?`, [
                req.body.nome,
                req.body.raca,
                req.body.porte,
                req.body.idade,
                req.body.id
            ],
            (error, result) => {
                if (error) return res.status(500).send({ error: error })

                const response = {
                    mensagem: 'Dados do pet foram alterados com sucesso!',
                    petAtualizado: {
                        id: req.id,
                        nome: req.body.nome,
                        raca: req.body.raca,
                        porte: req.body.porte,
                        idade: req.body.idade
                    }
                }
                return res.status(200).send(response)
            }
        )
    })
}

exports.deletePet = (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({ error: error })
        connection.query(
            `DELETE FROM pet WHERE id = ?`, [req.body.id],
            (error, result) => {
                connection.release()
                if (error) return res.status(500).send({ error: error })

                const response = {
                    mensagem: 'Pet removido com sucesso.',
                }

                return res.status(202).send(response)
            }
        )
    })
}