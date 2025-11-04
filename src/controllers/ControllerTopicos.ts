import { Response, Request } from "express";
import { pool } from "../config/db";

interface Topico {
    id_topico: number;
    nome_topico: string;
}

export class ControllerTopicos {
    static async create_topico(req: Request<{}, {}, Topico>, res: Response) {
        try {
            const params = [req.body.nome_topico];

            await pool.query(
                "INSERT INTO topicos (id_topico, nome_topico) VALUES (DEFAULT, $1)",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao criar tópico!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao criar tópico!",
                error: err,
            });
        }
    }

    static async get_all_topicos(req: Request, res: Response) {
        try {
            const results = await pool.query("SELECT * FROM topicos;");

            res.status(201).json({
                success_message: "Sucesso ao retornar tópicos!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar tópicos!",
                error: err,
            });
        }
    }

    static async get_topico_by_id(req: Request, res: Response) {
        try {
            const params = [req.params.id_topico];

            const results = await pool.query(
                "SELECT * FROM topicos WHERE id_topico = $1;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao retornar tópico!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar tópico!",
                error: err,
            });
        }
    }

    static async update_topico_by_id(req: Request, res: Response) {
        try {
            const params = [req.params.id_topico, req.body.nome_topico];

            const results = await pool.query(
                "UPDATE topicos WHERE id_topico = $1 SET nome_topico = $2;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao alterar tópico!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao alterar tópico!",
                error: err,
            });
        }
    }

    static async delete_topico_by_id(req: Request, res: Response) {
        try {
            const params = [req.params.id_topico];

            const results = await pool.query(
                "DELETE FROM topicos WHERE id_topico = $1;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao remover tópico!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao remover tópico!",
                error: err,
            });
        }
    }
}
