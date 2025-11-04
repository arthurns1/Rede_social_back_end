import { Response, Request } from "express";
import { pool } from "../config/db";

interface AdminComunidade {
    id_comunidade: number;
    login: string;
}

export class ControllerAdminComunidade {
    static async create_admin_comunidade(
        req: Request<{}, {}, AdminComunidade>,
        res: Response,
    ) {
        try {
            const params = [req.body.id_comunidade, req.body.login];

            await pool.query(
                "INSERT INTO comunidades (id_comunidade, login) VALUES ($1, $2)",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao adicionar admin a comunidade!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message:
                    "Houve um erro interno ao adicionar admin a comunidade!",
                error: err,
            });
        }
    }

    static async get_all_admins_comunidades(req: Request, res: Response) {
        try {
            const results = await pool.query(
                "SELECT * FROM admins_comunidades;",
            );

            res.status(201).json({
                success_message: "Sucesso ao retornar admins de comunidades!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message:
                    "Houve um erro interno ao retornar admins de comunidades!",
                error: err,
            });
        }
    }

    static async get_admin_comunidade(req: Request, res: Response) {
        try {
            const params = [req.body.id_comunidade, req.body.login];

            const results = await pool.query(
                "SELECT * FROM admins_comunidades WHERE id_comunidade = $1 AND login = $2;",
                params,
            );

            res.status(201).json({
                success_message:
                    "Sucesso ao retornar admins de uma comunidade!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message:
                    "Houve um erro interno ao retornar admins de uma  comunidade!",
                error: err,
            });
        }
    }

    static async delete_admin_comunidade_by_id(req: Request, res: Response) {
        try {
            const params = [req.body.id_comunidade, req.body.login];

            const results = await pool.query(
                "DELETE FROM admins_comunidades WHERE id_comunidade = $1 AND login = $2;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao remover admin da comunidade!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message:
                    "Houve um erro interno ao remover admin da comunidade!",
                error: err,
            });
        }
    }
}
