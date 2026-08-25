import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../infrastructure/services/JwtService";

declare global {
    namespace Express {
        interface Request {
            userId?: number;
            username?: string;
        }
    }
}

const jwtService = new JwtService();

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : undefined;

    if (!token) {
        res.status(401).json({ message: "Token requerido" });
        return;
    }

    try {
        const payload = jwtService.verifyToken(token);
        req.userId = payload.userId;
        req.username = payload.usuario;
        next();
    } catch {
        res.status(401).json({ message: "Token invalido o expirado" });
    }
}
