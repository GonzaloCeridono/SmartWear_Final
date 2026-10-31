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
    // Leemos el puerto desde el archivo .env, o usamos el 8080 por defecto
    this.port = process.env.PORT || 8080;

    // Secuencia de encendido
    this.conectarBD();
    this.middlewares();
    this.routes();
  }

  async conectarBD(): Promise<void> {
    // Acá llamaremos a la base de datos de MongoDB
    await conectarDB();
  }

  middlewares(): void {
    // CORS: Permite que tu frontend de React se comunique sin bloqueos de seguridad
    this.app.use(cors());
    // Lectura y parseo del body a formato JSON
    this.app.use(express.json());
  }

  routes(): void {
    // Acá montaremos las rutas reales (ej: this.app.use("/api/products", productRoutes))
    this.app.use("/api/products", productRoutes);
    this.app.use("/api/auth", authRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
