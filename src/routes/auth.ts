import { Router } from "express";
import { ControllerAuth } from "../controllers/ControllerAuth";

const auth = Router();

auth.post("/login", ControllerAuth.login);

export { auth };
