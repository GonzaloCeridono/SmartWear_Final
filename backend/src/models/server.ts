import express, { Express } from "express";
import cors from "cors";
import productRoutes from "../routes/products";
import { conectarDB } from "../database/config";
import authRoutes from "../routes/auth"; //

export class Server {
  app: Express;
  port: string | number;

  constructor() {
    this.app = express();
    // Se usa el puerto escrito en el archivo .env, o el 8080 por defecto
    this.port = process.env.PORT || 8080;

    this.conectarBD();
    this.middlewares();
    this.routes();
  }

  async conectarBD(): Promise<void> {
    await conectarDB();
  }

  middlewares(): void {
    // CORS: Permite que el frontend se comunique sin bloqueos de seguridad
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use("/api/products", productRoutes);
    this.app.use("/api/auth", authRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
