import { User } from "../../infrastructure/models/userModel";

export interface UserService {
    createUser(nombre: string, apellido: string, usuario: string, password: string): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    getUserByUsername(usuario: string): Promise<User | null>;
    login(usuario: string, password: string): Promise<User | null>;
    updateUser(id: number, nombre: string, apellido: string, usuario: string,): Promise <void>;
    changePassword(id: number, currentPassword: string, newPassword: string): Promise<void>;
    deleteUser(id: number): Promise<boolean>;
}