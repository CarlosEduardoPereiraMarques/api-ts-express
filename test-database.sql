CREATE SCHEMA Teste;


-- Modelo da tabela "cidade"
CREATE TABLE Teste.cidade (
  id serial PRIMARY KEY,
  nome VARCHAR(150)
);

-- Modelo da tabela "pessoa"
CREATE TABLE Teste.pessoa (
  id serial PRIMARY KEY,
  nome_completo VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  cidade_id INT,
  FOREIGN KEY (cidade_id) REFERENCES Teste.cidade(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Modelo da tabela "usuario"
CREATE TABLE Teste.usuario (
  id serial PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255)
);

INSERT INTO Teste.cidade ( id, nome )
VALUES (1, 'Belo Horizonte'), (2, 'Betim'), (3, 'Contagem');