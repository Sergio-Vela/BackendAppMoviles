import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const userController = new UserController();

export const userRoutes = Router();

userRoutes.post("/users", (req, res) => userController.createUser(req, res));
userRoutes.post("/login", (req, res) => userController.login(req, res));
userRoutes.get("/users/:id", (req,res) => userController.getUserById(req, res));
userRoutes.get("/users/username/:usuario", (req, res) => userController.getUserByUsername(req, res));
userRoutes.put("/users/:id", (req,res) => userController.updateUser(req, res));
userRoutes.patch("/users/:id/password", authMiddleware, (req, res) => userController.changePassword(req, res));
userRoutes.delete("/users/:id", (req, res) => userController.deleteUser(req, res));


export default userRoutes;

