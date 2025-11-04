import { Router } from "express";
import { ControllerComunidades } from "../controllers/ControllerComunidades";

const comunidade = Router();

comunidade.get("/get_all", ControllerComunidades.get_all_comunidades);
comunidade.get("/get_by_id/:id", ControllerComunidades.get_comunidade_by_id);
comunidade.post("/create", ControllerComunidades.create_comunidade);
comunidade.put("/update/:id", ControllerComunidades.update_comunidade_by_id);
comunidade.delete("/delete/:id", ControllerComunidades.delete_comunidade_by_id);

export { comunidade };
