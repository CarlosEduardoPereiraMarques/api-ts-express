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

INSERT INTO Teste.pessoa ( id, nome_completo, email, cidade_id )
VALUES (1, 'João da Silva', 'joao.silva@example.com', 1), (2, 'Maria Souza', 'maria.souza@example.com', 2), (3, 'Pedro Santos', 'pedro.santos@example.com', 3);

INSERT INTO Teste.usuario ( id, nome, email, senha )
VALUES (1, 'admin', 'admin@admin.com', '$2a$08$vxHO36vOo.aJ5J3dR.qA3O73/7cDIJQ7ZWlyhjMx/tvTV.EwFTmky'), (2, 'Maria Souza', 'maria.souza@example.com', '$2a$08$HKQNPAw6k7LX6fwF1vSSW.vihYisQUtlkS3IT8gY50RKVpjLXhDXy'), (3, 'Pedro Santos', 'pedro.santos@example.com', '$2a$08$HKQNPAw6k7LX6fwF1vSSW.vihYisQUtlkS3IT8gY50RKVpjLXhDXy');

