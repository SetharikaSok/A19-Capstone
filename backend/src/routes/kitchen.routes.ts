import { Router } from "express";
import { kitchenController } from "../controllers/kitchen.controller";
import { userController } from "../controllers/user.controller";

const routes = Router();

routes.post("/",  userController.authmiddleware, kitchenController.createKitchen)
routes.get("/:id", kitchenController.findUniqueKitchen);

export default routes;