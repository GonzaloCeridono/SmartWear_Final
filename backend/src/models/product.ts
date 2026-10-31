import { Schema, model } from "mongoose";

// 1. La Interfaz de TypeScript (Para que el editor nos ayude)
export interface IProduct {
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string[];
  talles: string[];
  stock: number;
  imagenUrl: string;
  estado: boolean;
}

// 2. El Esquema de Mongoose (Las reglas estrictas para la base de datos)
const ProductSchema = new Schema<IProduct>({
  nombre: {
    type: String,
    required: [true, "El nombre de la prenda es obligatorio"],
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  descripcion: {
    type: String,
  },
  categoria: {
    type: [String],
    required: true,
  },
  talles: {
    type: [String],
    default: [],
  },
  stock: {
    type: Number,
    default: 0,
  },
  imagenUrl: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

export default model<IProduct>("Product", ProductSchema);
