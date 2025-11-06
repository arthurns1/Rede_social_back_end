import { Router } from "express";
import { ControllerTopicos } from "../controllers/ControllerTopicos";

const topico = Router();

topico.get("/get_all", ControllerTopicos.get_all_topicos);
topico.get("/get_by_id/:id", ControllerTopicos.get_topico_by_id);
topico.post("/create", ControllerTopicos.create_topico);
topico.put("/update_by_id/:id", ControllerTopicos.update_topico_by_id);
topico.delete("/delete/:id", ControllerTopicos.delete_topico_by_id);

export { topico };
