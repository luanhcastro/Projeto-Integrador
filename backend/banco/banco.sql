DROP TABLE IF EXISTS servico;
DROP TABLE IF EXISTS avaliacaoCuidador;
DROP TABLE IF EXISTS cuidador;
DROP TABLE IF EXISTS pet;
DROP TABLE IF EXISTS dono;
DROP TABLE IF EXISTS sequelizemeta;

CREATE TABLE dono (
	id INT AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    dataNascimento DATE NOT NULL,
    cpf VARCHAR(12) UNIQUE NOT NULL,
    endereco VARCHAR(50) NOT NULL,
    qtdPetsdono INT,
    telefone VARCHAR(12) UNIQUE NOT NULL,
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
    FOREIGN KEY(idDono) REFERENCES dono(id) ON DELETE CASCADE
);

CREATE TABLE cuidador (
	id INT AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    dataNascimento DATE NOT NULL,
    cpf VARCHAR(12) UNIQUE NOT NULL,
    endereco VARCHAR(50)NOT NULL,
    numServicos INT,
    telefone VARCHAR(12) UNIQUE NOT NULL,
    PRIMARY KEY (id)  
);

CREATE TABLE avaliacaoCuidador(
	valor INT,
    idCuidador INT,
    FOREIGN KEY (idCuidador) REFERENCES cuidador(id)
);

CREATE TABLE servico (
	id INT AUTO_INCREMENT,
	tipo VARCHAR(20),
	preco DECIMAL(10, 2),
    dataInicio DATE,
    dataFinal DATE,
    idCuidador INT,
    idDono INT,
    idPet INT,
	PRIMARY KEY(id, idDono, idPet, idCuidador),
    FOREIGN KEY(idCuidador) REFERENCES cuidador(id) ,
	FOREIGN KEY(idDono) REFERENCES dono(id),
    FOREIGN KEY(idPet) REFERENCES pet(id)  
);