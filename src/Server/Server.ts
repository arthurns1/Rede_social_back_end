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
import WebSocket from "ws";
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

const wss = new WebSocket.Server({ server: httpServer });

wss.on("connection", (socket) => {
    socket.on("message", async (msg) => {
        try {
            const data = JSON.parse(msg.toString());
            const params = [data.emissor, data.receptor];

            const results = await pool.query(
                "SELECT * FROM mensagens WHERE receptor = $1 AND emissor = $2 OR emissor = $1 AND receptor = $2;",
                params,
            );

            socket.send(
                JSON.stringify({
                    success_message: "Sucesso ao enviar dados",
                    results: results.rows,
                }),
            );
        } catch (err) {
            JSON.stringify({
                error_message: "Houve um erro ao retornar mensagens!",
                error: err,
            });
        }
    });
});

export { httpServer };
