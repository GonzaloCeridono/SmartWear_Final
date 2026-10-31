import mongoose from "mongoose";

export const conectarDB = async (): Promise<void> => {
  try {
    // Usamos el link que guardaste en el .env
    const dbUrl = process.env.MONGODB_CNN;

    if (!dbUrl) {
      throw new Error("Falta la variable de entorno MONGODB_CNN");
    }

    await mongoose.connect(dbUrl);
    console.log("Conectado a la base de datos de la tienda 🟢");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};
