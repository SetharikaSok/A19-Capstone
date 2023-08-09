import { Router } from "express";
import { menuItemController } from "../controllers/menuItem.controller";
import { userController } from "../controllers/user.controller";

const routes = Router();

routes.post("/", userController.authmiddleware, menuItemController.createMenuItem)
routes.get("/:id", menuItemController.findUniqueMenuItem);

export default routes;