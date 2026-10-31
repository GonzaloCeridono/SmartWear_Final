// Importamos y configuramos dotenv primero que nada para habilitar las variables de entorno
import "dotenv/config";
import { Server } from "./models/server";

// Instanciamos nuestro servidor
const server = new Server();

// Lo ponemos a escuchar peticiones
server.listen();

export default server.app;
