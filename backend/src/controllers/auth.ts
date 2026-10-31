import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt";
import User from "../models/user";

export const registrarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;

    // 1. Verificamos si el email ya existe en la base de datos
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
      res.status(400).json({
        msg: "Ese correo ya está registrado",
      });
      return;
    }

    // 2. Creamos la instancia del usuario (todavía no se guarda)
    const usuario = new User({ nombre, email, password });

    // 3. Encriptamos la contraseña
    // El "salt" son las vueltas de encriptación. 10 es el estándar seguro.
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    // 4. Guardamos en MongoDB
    await usuario.save();

    res.status(201).json({
      msg: "Usuario creado con éxito",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const loginUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;

  try {
    // 1. Verificar si el email existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - correo" });
      return;
    }

    // 2. Verificar si el usuario está activo (por si lo "borramos" lógicamente)
    if (!usuario.estado) {
      res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - estado: false" });
      return;
    }

    // 3. Verificar la contraseña (bcryptjs compara la que mandó con la encriptada)
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - password" });
      return;
    }

    // 4. Generar el JWT
    const token = await generarJWT(usuario.id);

    // 5. Devolver el usuario y su nuevo token de sesión
    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};
