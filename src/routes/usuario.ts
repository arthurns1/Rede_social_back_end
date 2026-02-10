import { Router } from "express";
import { ControllerUsuarios } from "../controllers/ControllerUsuarios";
import { check_role } from "../middlewares/validation/check_role";
import { check } from "prettier";

const usuario = Router();

usuario.get("/get_all", ControllerUsuarios.get_all_usuarios);
usuario.get("/get_by_login/:login", ControllerUsuarios.get_usuario_by_login);
usuario.post("/create", ControllerUsuarios.create_usuario);
usuario.put(
    "/update/:login",
    check_role,
    ControllerUsuarios.update_usuario_by_login,
);
usuario.put(
    "/update_name/:login",
    ControllerUsuarios.update_usuario_name_by_login,
);
usuario.put(
    "/update_name_restricted/:login",
    check_role,
    ControllerUsuarios.update_usuario_name_by_login,
);
usuario.delete(
    "/delete/:login",
    check_role,
    ControllerUsuarios.delete_usuario_by_login,
);

export { usuario };
