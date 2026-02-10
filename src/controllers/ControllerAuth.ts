import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { pool } from "../config/db";
import { Usuario } from "./ControllerUsuarios";
import { config } from "dotenv";

config();

export class ControllerAuth {
    static async login(req: Request, res: Response) {
        try {
            const query = await pool.query(
                "SELECT * FROM usuarios WHERE login = $1",
                [req.body.login],
            );

            if (query.rows.length === 0) {
                res.status(404).json({
                    error_message: "Usuário não encontrado",
                    error: {},
                });
                return;
            }

            const usuario = query.rows[0] as Usuario;

            const token = await Jwt.sign(
                usuario,
                process.env.SECRET_KEY as string,
            );

            res.status(200).json({
                sucess_message: "Sucesso ao realizar login!",
                token: token,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno realizar login!",
                error: err,
            });
        }
    }
}
