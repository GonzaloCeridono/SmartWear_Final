import { Request, Response } from "express";
import Product from "../models/product";

// OBTENER TODOS LOS PRODUCTOS ACTIVOS
export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({ estado: true });

  res.json({ products });
};

// CREAR UN NUEVO PRODUCTO
export const createProduct = async (req: Request, res: Response) => {
  const { nombre, precio, descripcion, categoria, talles, stock, imagenUrl } =
    req.body;

  const product = new Product({
    nombre,
    precio,
    descripcion,
    categoria,
    talles,
    stock,
    imagenUrl,
  });

  await product.save();

  res.json({ product });
};
