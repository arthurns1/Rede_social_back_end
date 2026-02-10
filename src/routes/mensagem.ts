import { ControllerMensagens } from "../controllers/ControllerMensagens";
import { Router } from "express";
import { check_role } from "../middlewares/validation/check_role";

const mensagem = Router();

mensagem.get("/get_all", ControllerMensagens.get_all_mensagens);
mensagem.get("/get_by_id/:id", ControllerMensagens.get_mensagem_by_id);
mensagem.post(
    "/get_two_users_messages",
    ControllerMensagens.get_two_users_messages,
);
mensagem.post("/create", ControllerMensagens.create_mensagem);
mensagem.put("/update/:id", ControllerMensagens.update_mensagem_by_id);
mensagem.delete("/delete/:id", ControllerMensagens.delete_mensagem_by_id);

export { mensagem };
