import express, { Request } from "express";
import { userRoutes } from "./routes";
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
    }
}

export default new App().server;