import { Response, Request } from "express";
import { pool } from "../config/db";

interface Amizade {
    login_usuario: string;
    login_amigo: string;
    status: string;
}

export class ControllerAmizades {
    static async ask_amizades(req: Request<{}, {}, Amizade>, res: Response) {
        try {
            const params = [
                req.body.login_usuario,
                req.body.login_amigo,
                "pendente",
            ];

            await pool.query(
                "INSERT INTO amizades (login_usuario, login_amigo, status) VALUES ($1, $2, $3)",
                params,
            );

            res.status(201).json({
                success_message: "Pedido de amizade enviado!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao enviar pedido!",
                error: err,
            });
        }
    }

    static async get_all_user_amizades(req: Request, res: Response) {
        try {
            const params = [req.params.login];

            const results = await pool.query(
                "SELECT * FROM usuarios u JOIN amizades a ON ((a.login_usuario = $1 AND a.login_amigo = u.login) OR (a.login_amigo = $1 AND a.login_usuario = u.login)) WHERE a.status = 'aceita';",
                params,
            );

            res.status(201).json({
                success_message: "",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar amizades!",
                error: err,
            });
        }
    }

    static async get_all_pedidos_amizade(req: Request, res: Response) {
        try {
            const params = [req.params.login_usuario];
            const results = await pool.query(
                "SELECT * FROM amizades WHERE login_usuario = $1;",
                params,
            );

            res.status(201).json({
                success_message: "",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar amizades!",
                error: err,
            });
        }
    }

    static async confirm_amizade(req: Request, res: Response) {
        try {
            const params = [
                req.body.login_amigo,
                req.body.login_usuario,
                "aceita",
            ];

            const results = await pool.query(
                "UPDATE amizades SET status = $3 WHERE login_amigo = $1 AND login_usuario = $2;",
                params,
            );

            res.status(201).json({
                success_message: "Amizade aceita!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message:
                    "Houve um erro interno ao aceitar pedido de amizade!",
                error: err,
            });
        }
    }

    static async delete_amizade_by_id(req: Request, res: Response) {
        try {
            const params = [req.body.login_amigo, req.body.login_usuarios];

            const results = await pool.query(
                "DELETE FROM amizades WHERE login_amigo = $1 AND login_usuario = $2;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao remover amizade!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao remover amizade!",
                error: err,
            });
        }
    }
}
