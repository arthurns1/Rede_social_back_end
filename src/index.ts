import { config } from "dotenv";
config();
import { Server } from "./Server/Server";
import "./config/db";
import { pool } from "./config/db";
import { usuario } from "./routes/usuario";

const port = process.env.PORT || 8081;

Server.listen(port, () => {
    console.log(`Servidor lançado com sucesso em: http://localhost:${port}`);
});
