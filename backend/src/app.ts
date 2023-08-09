import express, { Request } from "express";
import { kitchenRoutes, menuItemRoutes, userRoutes } from "./routes";

import cors from "cors";

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors<Request>());
    }

    routes() {
        this.server.use("/auth", userRoutes);
        this.server.use("/kitchen", kitchenRoutes);
        this.server.use("/menuItem", menuItemRoutes);
    }

    
    
}

export default new App().server;