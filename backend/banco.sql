DROP TABLE IF EXISTS servico;
DROP TABLE IF EXISTS cuidador;
DROP TABLE IF EXISTS pet;
DROP TABLE IF EXISTS dono;

CREATE TABLE dono (
	id INT AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    idade INT,
    cpf VARCHAR(12),
    endereco VARCHAR(50),
    qtdPets INT,
    avaliacoes VARCHAR(100),
    telefone VARCHAR(12),
    PRIMARY KEY (id)
);

CREATE TABLE pet (
	id INT AUTO_INCREMENT,
    nomePet VARCHAR(20) NOT NULL,
    raca VARCHAR(20),
    porte VARCHAR(7),
    idade INT,
    idDono INT,
    PRIMARY KEY(id),
    FOREIGN KEY(idDono) REFERENCES dono(id)
);

CREATE TABLE cuidador (
	id INT AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    idade INT,
    cpf VARCHAR(12),
    endereco VARCHAR(50),
    numServicos INT,
    avaliacoes VARCHAR(100),
    telefone VARCHAR(12),
    PRIMARY KEY (id)  
);

CREATE TABLE servico (
	tipo VARCHAR(20),
	preco DECIMAL(10, 2),
    dataInicio DATE,
    dataFinal DATE,
    idCuidador INT,
    idDono INT,
    idPet INT,
	PRIMARY KEY(idDono, idPet, idCuidador),
    FOREIGN KEY(idCuidador) REFERENCES cuidador(id),
	FOREIGN KEY(idDono) REFERENCES dono(id),
    FOREIGN KEY(idPet) REFERENCES pet(id)
);