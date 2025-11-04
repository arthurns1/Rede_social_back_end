import { Response, Request } from "express";
import { pool } from "../config/db";
import { WebSocket } from "ws";

interface Mensagem {
    id_mensagem: number;
    conteudo: string;
    data_envio: string;
    vizualidada: boolean;
    receptor: string;
    emissor: string;
}

export class ControllerMensagens {
    static async create_mensagem(
        req: Request<{}, {}, Mensagem>,
        res: Response,
    ) {
        try {
            const params = [
                req.body.conteudo,
                req.body.data_envio,
                req.body.receptor,
                req.body.emissor,
            ];

            await pool.query(
                "INSERT INTO mensagens (id_mensagem, conteudo, data_envio, receptor, emissor) VALUES (DEFAULT, $1, $2, $3, $4)",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao criar mensagem!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao criar mensagem!",
                error: err,
            });
        }
    }

    static async get_all_mensagens(req: Request, res: Response) {
        try {
            const results = await pool.query("SELECT * FROM mensagens;");

            res.status(201).json({
                success_message: "Sucesso ao retornar mensagens!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar mensagens!",
                error: err,
            });
        }
    }

    static async get_two_users_messages(ws: WebSocket, req: Request) {
        try {
            ws.on("message", async () => {
                const params = [req.body.emissor, req.body.receptor];
                const results = await pool.query(
                    "SELECT * FROM mensagens WHERE emissor = $1 AND receptor = $2;",
                    params,
                );

                ws.send(
                    JSON.stringify({
                        success_message: "Sucesso ao enviar dados",
                        results: results,
                    }),
                );
            });
        } catch (err) {
            ws.send(
                JSON.stringify({
                    error_message: "Houve um erro ao retornar mensagens!",
                    error: err,
                }),
            );
        }
    }

    static async get_mensagem_by_id(req: Request, res: Response) {
        try {
            const params = [req.params.id];

            const results = await pool.query(
                "SELECT * FROM mensagens WHERE id_mensagem = $1;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao retornar mensagem!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar mensagem!",
                error: err,
            });
        }
    }

    static async update_mensagem_by_id(req: Request, res: Response) {
        try {
            const params = [req.params.id, req.body.nome_topico];

            const results = await pool.query(
                "UPDATE mensagens WHERE id_mensagens = $1 SET conteudo = $2, vizualizada = $3;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao alterar mensagem!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao alterar tópico!",
                error: err,
            });
        }
    }

    static async delete_mensagem_by_id(req: Request, res: Response) {
        try {
            const params = [req.params.id];

            const results = await pool.query(
                "DELETE FROM mensagens WHERE id_mensagem = $1;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao deletar mensagem!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao deletar mensagem!",
                error: err,
            });
        }
    }
}
