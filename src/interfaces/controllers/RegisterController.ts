import { Request, Response } from "express";
import { UserServiceImpl } from "../../infrastructure/services/UserServiceImpl";
import { UserProfileServiceImpl } from "../../infrastructure/services/UserProfileServiceImpl";
import { sendResponse } from "../helpers/ResponseHandler";

export class RegisterController {
    private readonly userService = new UserServiceImpl();
    private readonly userProfileService = new UserProfileServiceImpl();

    async register(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombre,
                apellido,
                usuario,
                password,
                fotoBase64,
                telefono,
                correo,
                fechaNac,
                genero,
            } = req.body;

            if (!nombre || !apellido || !usuario || !password) {
                sendResponse(res, 400, "Faltan campos obligatorios: nombre, apellido, usuario y password");
                return;
            }

            const user = await this.userService.createUser(nombre, apellido, usuario, password);
            const profile = await this.userProfileService.createProfile(user.id, {
                fotoBase64: fotoBase64 ?? null,
                telefono: telefono ?? null,
                correo: correo ?? null,
                fechaNac: fechaNac ?? null,
                genero: genero ?? null,
            });

            sendResponse(res, 201, "Usuario y perfil creados exitosamente", {
                user: {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    usuario: user.usuario,
                },
                profile: {
                    id: profile.id,
                    userId: profile.userId,
                    fotoBase64: profile.fotoBase64,
                    telefono: profile.telefono,
                    correo: profile.correo,
                    fechaNac: profile.fechaNac,
                    genero: profile.genero,
                },
            });
        } catch {
            sendResponse(res, 500, "Error interno del servidor");
        }
    }
}
