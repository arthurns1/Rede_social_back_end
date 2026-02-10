import { Response, Request } from "express";
import { pool } from "../config/db";

export interface Usuario {
    login: string;
    senha: string;
    cargo: string;
    nome_usuario: string;
}

export class ControllerUsuarios {
    static async create_usuario(req: Request<{}, {}, Usuario>, res: Response) {
        try {
            const params = [
                req.body.login,
                req.body.senha,
                req.body.cargo,
                req.body.nome_usuario,
            ];

            if (req.body.senha.length < 3) {
                res.status(400).json({
                    error_message: "Senha muito curta!",
                    error: {},
                });
                return;
            }

            if (req.body.nome_usuario.length < 3) {
                res.status(400).json({
                    error_message: "Nome de usuário muito curto!",
                    error: {},
                });
                return;
            }

            if (req.body.login.length < 3) {
                res.status(400).json({
                    error_message: "Login muito curto!",
                    error: {},
                });
                return;
            }

            if (req.body.login.length > 20) {
                res.status(400).json({
                    error_message: "Login muito longo!",
                    error: {},
                });
                return;
            }

            if (req.body.senha.length > 20) {
                res.status(400).json({
                    error_message: "Senha muito longa!",
                    error: {},
                });
                return;
            }

            if (req.body.senha.length > 30) {
                res.status(400).json({
                    error_message: "Nome de usuário muito longo!",
                    error: {},
                });
                return;
            }

            await pool.query(
                "INSERT INTO usuarios (login, senha, cargo, nome_usuario) VALUES ($1,$2,$3,$4);",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao criar usuário!",
                results: [],
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao criar usuário!",
                error: err,
            });
        }
    }

    static async get_all_usuarios(req: Request, res: Response) {
        try {
            const results = await pool.query("SELECT * FROM usuarios;");

            res.status(201).json({
                success_message: "Sucesso ao retornar usuarios!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar usuários!",
                error: err,
            });
        }
    }

    static async get_usuario_by_login(req: Request, res: Response) {
        try {
            const params = [req.params.login];

            const results = await pool.query(
                "SELECT * FROM usuarios WHERE login = $1;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao retornar usuário!",
                results: results.rows,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao retornar usuário!",
                error: err,
            });
        }
    }

    static async update_usuario_by_login(
        req: Request<{}, {}, Usuario>,
        res: Response,
    ) {
        try {
            const params = [
                req.body.login,
                req.body.senha,
                req.body.cargo,
                req.body.nome_usuario,
            ];

            const results = await pool.query(
                "UPDATE usuarios SET senha = $2, cargo = $3, nome_usuario = $4 WHERE login = $1 ;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao alterar usuário!",
                results: results,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao alterar usuário!",
                error: err,
            });
        }
    }

    static async update_usuario_name_by_login(req: Request, res: Response) {
        try {
            const params = [req.body.nome_usuario, req.params.login];

            const results = await pool.query(
                "UPDATE usuarios SET nome_usuario = $1 WHERE login = $2 ;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao alterar usuário!",
                results: results,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao alterar usuário!",
                error: err,
            });
        }
    }

    static async delete_usuario_by_login(req: Request, res: Response) {
        try {
            const params = [req.params.login];

            const results = await pool.query(
                "DELETE FROM usuarios WHERE login = $1;",
                params,
            );

            res.status(201).json({
                success_message: "Sucesso ao remover usuário!",
                results: results,
            });
        } catch (err) {
            res.status(500).json({
                error_message: "Houve um erro interno ao remover usuário!",
                error: err,
            });
        }
    }
}
