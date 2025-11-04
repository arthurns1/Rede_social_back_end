import { Response, Request } from "express";
import { pool } from "../config/db";

interface TopicoComunidade {
    id_topico: number;
    id_comunidade: string;
}

export class ControllerTopicosComunidades {
    static async create_topico_comunidade(
        req: Request<{}, {}, TopicoComunidade>,
        res: Response,
    ) {
        try {
            const params = [req.body.id_topico, req.body.id_comunidade];

            await pool.query(
                "INSERT INTO topicos_comunidades (id_topico, id_comunidade) VALUES ($1, $2)",
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

    static async get_all_topicos_comunidades(req: Request, res: Response) {
        try {
            const results = await pool.query(
                "SELECT * FROM topicos_comunidades;",
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

    static async get_topico_comunidade_by_id(req: Request, res: Response) {
        try {
            const params = [req.body.id_topico, req.body.id_comunidade];

            const results = await pool.query(
                "SELECT * FROM topicos WHERE id_topico = $1 AND id_comunidade = $2;",
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
