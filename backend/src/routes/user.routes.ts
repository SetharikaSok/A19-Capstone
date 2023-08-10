import { Router } from "express";
import { userController } from "../controllers/user.controller";

const routes = Router();

routes.post("/login", userController.loginUser)
routes.get("/login", userController.index)
routes.get("/dashboard", userController.authmiddleware, userController.dashboard)
routes.post("/", userController.createUser);
routes.get("/:id", userController.findUniqueUser);
routes.put("/:id", userController.updateUser);

export default routes;