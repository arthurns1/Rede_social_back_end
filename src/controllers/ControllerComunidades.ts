import { Response, Request } from "express";
import { pool } from "../config/db";

interface Comunidade {
    id_comunidade: number;
    nome_comunidade: string;
}

export class ControllerComunidades {
    static async create_comunidade(
        req: Request<{}, {}, Comunidade>,
        res: Response,
    ) {
        try {
            const params = [req.body.nome_comunidade];

            await pool.query(
                "INSERT INTO comunidades (id_comunidade, nome_comunidade) VALUES (DEFAULT, $1)",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao criar comunidade!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao criar comunidade!",
                error: err,
            });
        }
    }

    static async get_all_comunidades(req: Request, res: Response) {
        try {
            const results = await pool.query("SELECT * FROM comunidades;");

            res.status(201).json({
                success_message: "Sucesso ao retornar comunidades!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar comunidades!",
                error: err,
            });
        }
    }

    static async get_comunidade_by_id(req: Request, res: Response) {
        try {
            const params = [req.params.id];

            const results = await pool.query(
                "SELECT * FROM comunidades WHERE id_comunidade = $1;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao retornar comunidade!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar comunidade!",
                error: err,
            });
        }
    }

    static async update_comunidade_by_id(req: Request, res: Response) {
        try {
            const params = [req.params.id, req.body.nome_comunidade];

            const results = await pool.query(
                "UPDATE comunidades SET nome_comunidade = $2 WHERE id_comunidade = $1 ;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao alterar comunidade!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao alterar comunidade!",
                error: err,
            });
        }
    }

    static async delete_comunidade_by_id(req: Request, res: Response) {
        try {
            const params = [req.params.id];

            const results = await pool.query(
                "DELETE FROM comunidades WHERE id_comunidade = $1;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao deletar comunidade!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao deletar comunidade!",
                error: err,
            });
        }
    }
}
