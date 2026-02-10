import { Router } from "express";
import { ControllerAdminComunidade } from "../controllers/ControllerAdminsComunidades";
import { check_role } from "../middlewares/validation/check_role";

const admin_comunidade = Router();

admin_comunidade.get(
    "/get_all",
    ControllerAdminComunidade.get_all_admins_comunidades,
);
admin_comunidade.get(
    "/get_by_id/:id",
    ControllerAdminComunidade.get_admin_comunidade,
);
admin_comunidade.post(
    "/create",
    ControllerAdminComunidade.create_admin_comunidade,
);
admin_comunidade.delete(
    "/delete/:id",
    check_role,
    ControllerAdminComunidade.delete_admin_comunidade_by_id,
);

export { admin_comunidade };
