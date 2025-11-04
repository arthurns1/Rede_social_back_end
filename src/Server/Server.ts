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
import expressWs from "express-ws";
import Express from "express";

const Server = Express();

Server.get("/", (req, res) => {
    res.send("Teste");
});

expressWs(Server);
Server.use(cors());
Server.use(Express.json());

Server.use("/usuario", usuario);
Server.use("/topico", topico);
Server.use("/comunidade", comunidade);
Server.use("/mensagem", mensagem);
Server.use("/admin_comunidade", admin_comunidade);
Server.use("/amizade", amizade);
Server.use(auth);

export { Server };
