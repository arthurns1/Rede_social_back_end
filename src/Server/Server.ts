//Rotas
import { topico } from "../routes/topico";
import { usuario } from "../routes/usuario";
import { comunidade } from "../routes/comunidade";
import { mensagem } from "../routes/mensagem";
import { admin_comunidade } from "../routes/admin_comunidade";
import { amizade } from "../routes/amizade";
import { auth } from "../routes/auth";

//Configs
import cors from "cors";
import Express from "express";
import http from "http";
import io from "socket.io";
import { ControllerMensagens } from "../controllers/ControllerMensagens";
import { pool } from "../config/db";

const Server = Express();

Server.use(cors());
Server.use(Express.json());

Server.use("/usuario", usuario);
Server.use("/topico", topico);
Server.use("/comunidade", comunidade);
Server.use("/mensagem", mensagem);
Server.use("/admin_comunidade", admin_comunidade);
Server.use("/amizade", amizade);
Server.use(auth);

const httpServer = http.createServer(Server);

const wss = new io.Server(httpServer, {
    cors: { origin: "*" },
});

wss.on("connection", (socket) => {
    socket.on("enviar_mensagem", async (msg) => {
        const params = [
            msg.conteudo,
            msg.data_envio,
            msg.receptor,
            msg.emissor,
        ];

        const mensagem = await pool.query(
            "INSERT INTO mensagens (id_mensagem, conteudo, data_envio, receptor, emissor, vizualizada) VALUES (DEFAULT, $1, $2, $3, $4, false) RETURNING *",
            params,
        );

        socket.emit("receber_mensagem", JSON.stringify(mensagem.rows[0]));
    });
});

export { httpServer };
