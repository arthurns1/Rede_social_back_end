import { Router } from "express";
import { ControllerComunidades } from "../controllers/ControllerComunidades";
import { ControllerTopicosComunidades } from "../controllers/ControllerTopicosComunidades";
import { ControllerUsuariosComunidades } from "../controllers/ControllerUsuariosComunidades";

const comunidade = Router();

comunidade.get("/get_all", ControllerComunidades.get_all_comunidades);
comunidade.get("/get_by_id/:id", ControllerComunidades.get_comunidade_by_id);
comunidade.post("/create", ControllerComunidades.create_comunidade);
comunidade.put("/update/:id", ControllerComunidades.update_comunidade_by_id);
comunidade.delete("/delete/:id", ControllerComunidades.delete_comunidade_by_id);
comunidade.post(
    "/add_topico",
    ControllerTopicosComunidades.create_topico_comunidade,
);
comunidade.put(
    "/entrar",
    ControllerUsuariosComunidades.create_usuario_comunidade,
);
comunidade.get(
    "/get_all_user_not_comunidades/:login",
    ControllerComunidades.get_all_user_not_comunidades,
);
comunidade.get(
    "/get_all_user_comunidades/:login",
    ControllerComunidades.get_all_user_comunidades,
);

export { comunidade };
