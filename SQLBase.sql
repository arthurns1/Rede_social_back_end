CREATE TABLE usuarios(
	login VARCHAR(20) UNIQUE NOT NULL,
	senha VARCHAR(20) NOT NULL,
	cargo VARCHAR(20),
	nome_usuario VARCHAR(30),
	CONSTRAINT pk_login PRIMARY KEY (login)
);

CREATE TABLE mensagens(
	id_mensagem SERIAL,
	conteudo TEXT NOT NULL,
	data_envio TIMESTAMP NOT NULL,
	vizualizada BOOLEAN NOT NULL,
	receptor VARCHAR(20) NOT NULL,
	emissor VARCHAR(20) NOT NULL,
	CONSTRAINT pk_id_mensagem PRIMARY KEY (id_mensagem),
	CONSTRAINT fk_receptor FOREIGN KEY (receptor) REFERENCES usuarios(login) ON DELETE CASCADE,
	CONSTRAINT fk_emissor FOREIGN KEY (emissor) REFERENCES usuarios(login) ON DELETE CASCADE
);

CREATE TABLE comunidades(
	id_comunidade SERIAL NOT NULL,
	nome_comunidade VARCHAR(50) NOT NULL,
	CONSTRAINT pk_id_comunidade PRIMARY KEY (id_comunidade)
);

CREATE TABLE admins_comunidade(
	id_comunidade INTEGER NOT NULL,
	login VARCHAR(20) NOT NULL,
	CONSTRAINT pk_comunidade_login PRIMARY KEY (id_comunidade, login),
	CONSTRAINT fk_id_comunidade_admins FOREIGN KEY (id_comunidade) REFERENCES comunidades(id_comunidade) ON DELETE CASCADE, 
	CONSTRAINT fk_login_admins FOREIGN KEY (login) REFERENCES usuarios(login) ON DELETE CASCADE
);

CREATE TABLE topicos(
	id_topico SERIAL,
	nome_topico VARCHAR(40),
	CONSTRAINT pk_id_topico PRIMARY KEY (id_topico)
);

CREATE TABLE amizades(
	login_amigo VARCHAR(20),
	login_usuario VARCHAR(20),
	status VARCHAR(8) NOT NULL,
	CONSTRAINT pk_amizade PRIMARY KEY (login_amigo, login_usuario),
	CONSTRAINT fk_login_usuario FOREIGN KEY (login_amigo) REFERENCES usuarios(login),
	CONSTRAINT fk_login_amigo FOREIGN KEY (login_usuario) REFERENCES usuarios(login) 
);

CREATE TABLE mensagens_usuario(
	id_mensagem INT,
	login VARCHAR(20) NOT NULL,
	CONSTRAINT pk_mensagem_usuario PRIMARY KEY (id_mensagem, login),
	CONSTRAINT fk_id_mensagem_m_u FOREIGN KEY (id_mensagem) REFERENCES mensagens(id_mensagem) ON DELETE CASCADE,
	CONSTRAINT fk_id_usuario_m_u FOREIGN KEY (login) REFERENCES usuarios(login) ON DELETE CASCADE 
);

CREATE TABLE usuarios_comunidades(
	login VARCHAR(20) NOT NULL,
	id_comunidade INTEGER NOT NULL,
	CONSTRAINT pk_login_id_comunidade PRIMARY KEY (login, id_comunidade),
	CONSTRAINT fk_login_u_c FOREIGN KEY (login) REFERENCES usuarios(login) ON DELETE CASCADE,
	CONSTRAINT fk_id_comunidade FOREIGN KEY (id_comunidade) REFERENCES comunidades(id_comunidade) ON DELETE CASCADE
);

CREATE TABLE topicos_comunidades(
	id_topico INTEGER,
	id_comunidade INTEGER,
	CONSTRAINT pk_topicos_comunidades PRIMARY KEY (id_topico, id_comunidade),
	CONSTRAINT fk_id_topico_t_c FOREIGN KEY (id_topico) REFERENCES topicos(id_topico) ON DELETE CASCADE,
	CONSTRAINT fk_id_comunidade_t_c FOREIGN KEY (id_comunidade) REFERENCES comunidades(id_comunidade) ON DELETE CASCADE
);