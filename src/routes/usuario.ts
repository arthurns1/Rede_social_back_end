import { Router } from "express";
import { ControllerUsuarios } from "../controllers/ControllerUsuarios";

const usuario = Router();

usuario.get("/get_all", ControllerUsuarios.get_all_usuarios);
usuario.get("/get_by_login/:login", ControllerUsuarios.get_usuario_by_login);
usuario.post("/create", ControllerUsuarios.create_usuario);
usuario.put("/update/:login", ControllerUsuarios.update_usuario_by_login);
usuario.delete("/delete/:login", ControllerUsuarios.delete_usuario_by_login);


export { usuario };
