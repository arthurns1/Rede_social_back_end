import { Router } from "express";
import { ControllerAmizades } from "../controllers/ControllerAmizades";

const amizade = Router();

amizade.get("/get_all_user_amizades", ControllerAmizades.get_all_user_amizades);
amizade.post("/ask_amizade", ControllerAmizades.ask_amizades);
amizade.put("/confirm_amizade", ControllerAmizades.confirm_amizade);
amizade.get("/delete_amizade", ControllerAmizades.delete_amizade_by_id);

export { amizade };
