import { Request, Response } from "express";
import Product from "../models/product";

// OBTENER TODOS LOS PRODUCTOS
export const getProducts = async (req: Request, res: Response) => {
  // Solo traemos los que estén activos (estado: true)
  const products = await Product.find({ estado: true });

  res.json({ products });
};

// CREAR UN NUEVO PRODUCTO
export const createProduct = async (req: Request, res: Response) => {
  const { nombre, precio, descripcion, categoria, talles, stock, imagenUrl } =
    req.body;

  // Armamos el objeto con los datos que llegaron
  const product = new Product({
    nombre,
    precio,
    descripcion,
    categoria,
    talles,
    stock,
    imagenUrl,
  });

  // Guardamos en la base de datos
  await product.save();

  res.json({ product });
};
