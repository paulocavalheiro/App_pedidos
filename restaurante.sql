-- Criar tabela categoria
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL,
    icone VARCHAR(255)
);

-- Criar tabela prato
CREATE TABLE prato (
    id SERIAL PRIMARY KEY,
    categoria_id INTEGER REFERENCES categoria(id),
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10, 2) NOT NULL,
    tempo_preparo TIMESTAMP,
    status BOOLEAN NOT NULL
);

-- Criar tabela pedido
CREATE TABLE pedido (
    id SERIAL PRIMARY KEY,
    numero_mesa INTEGER,
    cpf_cliente VARCHAR(14),
    nome_cliente VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    data_pedido TIMESTAMP NOT NULL
);

-- Criar tabela item_pedido
CREATE TABLE item_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedido(id),
    prato_id INTEGER REFERENCES prato(id)
);

