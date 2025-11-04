import { Response, Request } from "express";
import { pool } from "../config/db";

interface UsuariosComunidade {
    login: string;
    id_comunidade: number;
}

export class ControllerUsuariosComunidades {
    static async create_usuario_comunidade(
        req: Request<{}, {}, UsuariosComunidade>,
        res: Response,
    ) {
        try {
            const params = [req.body.login, req.body.id_comunidade];

            await pool.query(
                "INSERT INTO usuarios_comunidades (login, id_comunidade) VALUES ($1, $2)",
                params,
            );

            res.status(201).json({
                success_message: "",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "",
                error: err,
            });
        }
    }

    static async get_all_topicos_usuarios_comunidades(
        req: Request,
        res: Response,
    ) {
        try {
            const results = await pool.query(
                "SELECT * FROM usuarios_comunidades;",
            );

            res.status(201).json({
                success_message: "",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "",
                error: err,
            });
        }
    }

    static async get_usuarios_comunidades_by_id(req: Request, res: Response) {
        try {
            const params = [req.body.login, req.body.id_comunidade];

            const results = await pool.query(
                "SELECT * FROM usuarios_comunidades WHERE login = $1 AND id_comunidade = $2;",
                params,
            );

            res.status(201).json({
                success_message: "",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "",
                error: err,
            });
        }
    }
}
