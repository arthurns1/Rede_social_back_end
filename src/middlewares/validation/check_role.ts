import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";

interface Usuario {
    login: string;
    senha: string;
    cargo: string;
    nome_usuario: string;
}

export function check_role(req: Request, res: Response, next: NextFunction) {
    try {
        const usuario = jwtDecode(
            req.headers.authorization as string,
        ) as Usuario;

        if (usuario.cargo == "Admin") {
            next();
        } else {
            res.status(401).json({
                error: [],
                error_message: "Não autorizado",
            });
        }
    } catch (err) {
        res.status(401).json({
            error: err,
            error_message: "Houve um erro interno!",
        });
    }
}
