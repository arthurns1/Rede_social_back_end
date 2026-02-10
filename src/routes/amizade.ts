import { Router } from "express";
import { ControllerAmizades } from "../controllers/ControllerAmizades";
import { check_role } from "../middlewares/validation/check_role";

const amizade = Router();

amizade.get(
    "/get_all_user_amizades/:login",
    ControllerAmizades.get_all_user_amizades,
);
amizade.get(
    "/get_all_user_not_amizades/:login",
    ControllerAmizades.get_all_user_not_amizades,
);
amizade.get(
    "/get_all_pedidos_amizade/:login",
    ControllerAmizades.get_all_pedidos_amizade,
);
amizade.post("/ask_amizade", ControllerAmizades.ask_amizades);
amizade.put("/confirm_amizade", ControllerAmizades.confirm_amizade);
amizade.delete("/delete", check_role, ControllerAmizades.delete_amizade_by_id);

export { amizade };
